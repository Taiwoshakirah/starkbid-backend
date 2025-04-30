import { Request, Response } from "express";
import { getTransactionHistory } from "../services/transactionService";

export const getTransactions = async (req: Request, res: Response) => {
  const wallet = req.params.wallet;
  try {
    const transactions = await getTransactionHistory(wallet);
    res.json({ success: true, data: transactions });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
