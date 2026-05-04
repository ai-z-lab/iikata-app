const convertButton = document.getElementById("convertButton");
const userInput = document.getElementById("userInput");
const resultArea = document.getElementById("resultArea");

const softText = document.getElementById("softText");
const softReason = document.getElementById("softReason");

const businessText = document.getElementById("businessText");
const businessReason = document.getElementById("businessReason");

const youngText = document.getElementById("youngText");
const youngReason = document.getElementById("youngReason");

const patterns = [
  {
    keywords: ["なんで", "終わってない", "まだ"],
    soft: "今どのあたりまで進んでいるか、確認させてもらってもいいですか？",
    softReason: "責める言い方ではなく、状況確認の形に変えています。",
    business: "現在の進捗状況と、完了見込みを教えてください。",
    businessReason: "感情を入れず、業務上必要な確認として伝えています。",
    young: "今どこまで進んでいますか？困っているところがあれば一緒に整理しましょう。",
    youngReason: "できていない点だけでなく、困りごとも聞ける形にしています。"
  },
  {
    keywords: ["前にも", "言った", "言いました"],
    soft: "前回お伝えした内容と重なる部分があるので、もう一度一緒に確認しましょう。",
    softReason: "相手を責めず、再確認の形に変えています。",
    business: "以前共有した内容と関連しますので、改めて確認をお願いします。",
    businessReason: "感情的に聞こえやすい表現を、業務上の確認に置き換えています。",
    young: "前にも少し話した内容なので、もう一度整理しておきましょうか。",
    youngReason: "聞き直しやすい余地を残す表現にしています。"
  },
  {
    keywords: ["ちゃんと", "して"],
    soft: "もう少しだけ丁寧に確認してもらえると助かります。",
    softReason: "命令ではなく、お願いの形に変えています。",
    business: "確認の精度を上げるため、再度チェックをお願いします。",
    businessReason: "曖昧な注意ではなく、具体的な行動に置き換えています。",
    young: "見落としがないか、一緒に確認してみましょう。",
    youngReason: "責めるより、確認する姿勢を伝えています。"
  },
{
  keywords: ["やる気", "あるの"],
  soft: "少し気になっているので、今の状況を聞かせてもらってもいいですか？",
  softReason: "相手の姿勢を決めつけず、状況を確認する言い方にしています。",
  business: "現在の進め方と、困っている点があれば共有してください。",
  businessReason: "感情的な指摘ではなく、業務上の確認として伝えています。",
  young: "今、進めにくいところや迷っているところはありますか？",
  youngReason: "やる気の有無ではなく、困りごとを聞く形にしています。"
},
{
  keywords: ["普通", "わかる"],
  soft: "少し説明が足りなかったかもしれないので、もう一度確認しましょう。",
  softReason: "相手だけの問題にせず、伝え方も含めて見直す表現にしています。",
  business: "認識にズレがないか、改めて確認させてください。",
  businessReason: "責める言い方を避け、共通認識を整える表現にしています。",
  young: "わかりにくいところがあれば、そこから一緒に確認しましょう。",
  youngReason: "相手が質問しやすい余地を残しています。"
}
];

function findPattern(input) {
  return patterns.find((pattern) => {
    return pattern.keywords.some((keyword) => input.includes(keyword));
  });
}

function createDefaultResult(input) {
  return {
    soft: "少し言い方を変えると、相手に伝わりやすくなりそうです。",
    softReason: "直接的な表現を避け、受け取りやすい形にしています。",
    business: "内容を整理したうえで、必要な点を確認させてください。",
    businessReason: "感情ではなく、確認事項として伝える形にしています。",
    young: "困っているところがあれば、一緒に確認していきましょう。",
    youngReason: "相手が相談しやすい雰囲気を残しています。"
  };
}

convertButton.addEventListener("click", () => {
  const input = userInput.value.trim();

  if (input === "") {
    alert("変換したい言葉を入力してください。");
    return;
  }

  const result = findPattern(input) || createDefaultResult(input);

  softText.textContent = result.soft;
  softReason.textContent = result.softReason;

  businessText.textContent = result.business;
  businessReason.textContent = result.businessReason;

  youngText.textContent = result.young;
  youngReason.textContent = result.youngReason;

  resultArea.classList.remove("hidden");
});

const copyButtons = document.querySelectorAll(".copyButton");

copyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.target;
    const targetText = document.getElementById(targetId).textContent;

    navigator.clipboard.writeText(targetText);

    button.textContent = "コピーしました";

    setTimeout(() => {
      button.textContent = "コピーする";
    }, 1500);
  });
});
const exampleButtons = document.querySelectorAll(".exampleButton");

exampleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    userInput.value = button.textContent;
    userInput.focus();
  });
});