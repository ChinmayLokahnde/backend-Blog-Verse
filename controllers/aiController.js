import { exec } from "child_process";

export const generateBlog = async (req, res) => {
  const { idea } = req.body;

  if (!idea) {
    return res.status(400).json({ error: "Idea is required" });
  }

  const command = `python generate_blog.py "${idea.replace(/"/g, '\\"')}"`;

  exec(command, { cwd: "./", encoding: "utf-8" }, (error, stdout, stderr) => {
    if (error || stderr.toLowerCase().includes("error")) {
      return res.status(500).json({ error: "AI generation failed", details: stderr || error.message });
    }

    const cleanedOutput = stdout
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join(" "); // Join all lines into one blog string

    return res.status(200).json({ blog: cleanedOutput });
  });
};
