import Result from "../models/resultModel.js";

export async function createResult(req, res) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorised",
      });
    }

    const { title, technology, level, totalQuestion, correct, wrong } = req.body;

    if (!technology || !level || totalQuestion === 0 || correct === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing fields",
      });
    }

    const computedWrong =
      wrong !== undefined
        ? Number(wrong)
        : Math.max(0, Number(totalQuestion) - Number(correct));

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Missing field: title",
      });
    }

    const payload = {
      title: String(title).trim(),
      technology,
      level,
      totalQuestion: Number(totalQuestion),
      correct: Number(correct),
      wrong: computedWrong,
      user: req.user.id,
    };

    const created = await Result.create(payload);

    return res.status(201).json({
      success: true,
      message: "Result Created",
      result: created,
    });
  } catch (err) {
    console.error("Create error", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

// List of results
export async function ListResults(req, res) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorised",
      });
    }

    const { technology } = req.query;
    const query = { user: req.user.id };

    if (technology && technology.toLowerCase() !== "all") {
      query.technology = technology;
    }

    const items = await Result.find(query).sort({ createdAt: -1 }).lean();

    return res.json({
      success: true,
      results: items,
    });
  } catch (err) {
    console.error("ListResult error", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}
