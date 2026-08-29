// 从治疗师源数据生成 skill 参考文件（therapists-1.md / therapists-2.md）
const fs = require("fs");
const path = require("path");
const groups = require("./data-therapists.js").concat(require("./data-therapists2.js"));

const OUT = path.join(__dirname, "..", "references");
fs.mkdirSync(OUT, { recursive: true });

let no = 0;
const sec1 = [], sec2 = [];   // 正文（按组）
const idx1 = [], idx2 = [];   // 快速索引行

groups.forEach((g) => {
  const body = [`## ${g.title.replace("（续）", "")}`, "", `> ${g.intro}`, ""];
  g.members.forEach((m) => {
    m.no = ++no;
    const idxLine = `| ${m.no} | ${m.name} | ${m.school.split("、")[0]} |`;
    (no <= 50 ? idx1 : idx2).push(idxLine);
    body.push(`### ${m.no}　${m.name}｜${m.en}`);
    body.push(`- **流派身份**：${m.school}`);
    body.push(`- **代表著作**：${m.works}`);
    body.push(`- **治疗过程**：${m.process}`);
    body.push(`- **对话风格**：${m.style}`);
    body.push(`- **标志性技术（含示例问句）**：`);
    m.techniques.forEach((t) => body.push(`  - ${t}`));
    body.push(`- **AI角色扮演要点**：${m.ai}`);
    body.push("");
  });
  (no <= 50 ? sec1 : sec2).push(...body);
});

const header = (title, idx) => [
  `# ${title}`,
  "",
  "> 用途：AI心理医生技能的风格定制素材。用户想要特定流派/人物风格时，按编号挑2–3位档案，重点看【对话风格】【标志性技术】【AI角色扮演要点】。",
  "",
  "## 快速索引",
  "",
  "| # | 姓名 | 流派 |",
  "|---|---|---|",
  ...idx,
  "",
].join("\n");

fs.writeFileSync(path.join(OUT, "therapists-1.md"),
  header("治疗师档案库 · 第1–50位（经典核心）", idx1) + sec1.join("\n"));
fs.writeFileSync(path.join(OUT, "therapists-2.md"),
  header("治疗师档案库 · 第51–100位（扩展补充）", idx2) + sec2.join("\n"));

console.log("idx1:", idx1.length, "idx2:", idx2.length);
console.log("last-1:", idx1[idx1.length - 1]);
console.log("first-2:", idx2[0]);
console.log("last-2:", idx2[idx2.length - 1]);
