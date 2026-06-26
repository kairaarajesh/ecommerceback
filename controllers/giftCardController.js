import { giftcards } from "../models/giftcard.js";

export const createGift = async (req, res) => {
  try {
    const {
      name,
      number,
      village,
      occasion,
      description,
      previous_balance,
      current_balance,
      payment_mode,
    } = req.body;

    if (!/^\d{10}$/.test(number)) {
      return res.status(400).json({
        message: "Mobile number must be exactly 10 digits",
      });
    }

    const lastGift = await giftcards.findOne().sort({ createdAt: -1 });

    let invoice_number = "INV000001";

    if (lastGift && lastGift.invoice_number) {
      const lastNumber = parseInt(lastGift.invoice_number.replace("INV", ""));

      invoice_number = "INV" + String(lastNumber + 1).padStart(6, "0");
    }

    const gift = new giftcards({
      invoice_number,
      name,
      number,
      village,
      occasion,
      description,
      previous_balance,
      current_balance,
      payment_mode,
    });

    const giftCard = await gift.save();
    return res.status(200).json({
      message: "GiftCard created successfully",
      data: giftCard,
    });
  } catch (error) {
    console.log("==", error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const createAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    const skip = (page - 1) * limit;

    const totalGift = await giftcards.countDocuments();

    const gift = await giftcards
      .find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    const formattedGifts = gift.map((gift) => {
      const obj = gift.toObject();

      obj.created_at = new Date(obj.createdAt).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      return obj;
    });

    const totalPreviousBalance = formattedGifts.reduce(
      (sum, item) => sum + (item.previous_balance || 0),
      0,
    );

    const totalCurrentBalance = formattedGifts.reduce(
      (sum, item) => sum + (item.current_balance || 0),
      0,
    );
    const grandTotal = totalPreviousBalance + totalCurrentBalance;

    return res.status(201).json({
      Message: "Get All giftCard",
      currentPage: page,
      totalPages: Math.ceil(totalGift / limit),
      totalGift,
      gift: formattedGifts,
     grandTotal: grandTotal.toFixed(2),
    });
  } catch (error) {
    console.log("==", error);
    res.status(500).json({ Message: "Server Error" });
  }
};
