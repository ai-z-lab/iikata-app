const convertButton = document.getElementById("convertButton");
const userInput = document.getElementById("userInput");
const resultArea = document.getElementById("resultArea");

const categoryText = document.getElementById("categoryText");
const categoryReason = document.getElementById("categoryReason");

const softText = document.getElementById("softText");
const softReason = document.getElementById("softReason");

const businessText = document.getElementById("businessText");
const businessReason = document.getElementById("businessReason");

const youngText = document.getElementById("youngText");
const youngReason = document.getElementById("youngReason");

const patterns = [
  {
    category: "進捗確認系",
    keywords: ["終わってない", "終わってへん", "終わっとらん", "終わらん", "まだ", "進捗", "どうなってる", "できてない", "遅い"],
    categoryReason: "完了状況や進み具合を確認したい意図が強い表現です。",
    soft: "今どのあたりまで進んでいるか、確認させてもらってもいいですか？",
    softReason: "責める印象を弱めて、まず状況を聞く形にしています。",
    business: "現在の進捗状況と、完了見込みを教えてください。",
    businessReason: "感情を入れず、業務上必要な確認として伝えています。",
    young: "今どこまで進んでいますか？困っているところがあれば一緒に整理しましょう。",
    youngReason: "遅れを責めず、つまずきがあれば相談できる言い方にしています。"
  },
  {
    category: "再確認・前にも言った系",
    keywords: ["前にも", "前も", "前に", "言った", "言いました", "説明した", "共有した", "また", "やん", "しとる", "しとん"],
    categoryReason: "以前伝えた内容をもう一度確認したい意図が含まれています。",
    soft: "前回お伝えした内容と重なる部分があるので、もう一度一緒に確認しましょう。",
    softReason: "相手を責めず、再確認の機会として伝えています。",
    business: "以前共有した内容と関連しますので、改めて確認をお願いします。",
    businessReason: "感情的に聞こえやすい表現を、業務上の確認に置き換えています。",
    young: "前にも少し話した内容なので、もう一度整理しておきましょうか。",
    youngReason: "聞き直しやすい余地を残し、責められている印象を抑えています。"
  },
  {
    category: "命令・雑な指示系",
    keywords: ["ちゃんとして", "ちゃんとせえ", "ちゃんとしろ", "早く", "やって", "しといて", "やれ", "せえ", "雑", "適当"],
    categoryReason: "依頼よりも命令や注意として受け取られやすい表現です。",
    soft: "もう少しだけ丁寧に確認してもらえると助かります。",
    softReason: "命令ではなく、お願いの形に変えています。",
    business: "確認の精度を上げるため、再度チェックをお願いします。",
    businessReason: "曖昧な注意ではなく、相手が動きやすい行動に置き換えています。",
    young: "見落としがないか、一緒に確認してみましょう。",
    youngReason: "責めるより、次に何をすればよいかが伝わる言い方にしています。"
  },
  {
    category: "やる気・態度を責める系",
    keywords: ["やる気", "態度", "本気", "なめてる", "ふざけてる", "聞いてる", "ちゃんと聞いて", "集中して"],
    categoryReason: "相手の気持ちや姿勢を決めつけているように聞こえやすい表現です。",
    soft: "少し気になっているので、今の状況を聞かせてもらってもいいですか？",
    softReason: "相手の姿勢を決めつけず、状況を確認する言い方にしています。",
    business: "現在の進め方と、困っている点があれば共有してください。",
    businessReason: "態度への指摘ではなく、仕事の進め方を確認する形にしています。",
    young: "今、進めにくいところや迷っているところはありますか？",
    youngReason: "やる気の有無ではなく、困りごとを聞く形にしています。"
  },
  {
    category: "常識・理解を責める系",
    keywords: ["普通", "常識", "わかる", "わからん", "わかってない", "理解してない", "なんでわから", "これくらい", "やろ", "じゃろ", "やけん"],
    categoryReason: "理解不足や常識の有無を責めているように伝わりやすい表現です。",
    soft: "少し説明が足りなかったかもしれないので、もう一度確認しましょう。",
    softReason: "相手だけの問題にせず、伝え方も含めて見直す表現にしています。",
    business: "認識にズレがないか、改めて確認させてください。",
    businessReason: "責める言い方を避け、共通認識を整える表現にしています。",
    young: "わかりにくいところがあれば、そこから一緒に確認しましょう。",
    youngReason: "質問しやすい余地を残し、萎縮しにくい言い方にしています。"
  }
];

function findPattern(input) {
  const normalizedInput = input.replace(/\s/g, "");

  return patterns.find((pattern) => {
    return pattern.keywords.some((keyword) => normalizedInput.includes(keyword));
  });
}

function createDefaultResult() {
  return {
    category: "分類しきれない表現",
    categoryReason: "強い言い方の可能性はありますが、5カテゴリのどれかに明確には寄せきれませんでした。",
    soft: "少し言い方を変えると、相手に伝わりやすくなりそうです。",
    softReason: "直接的な表現を避け、受け取りやすい形にしています。",
    business: "内容を整理したうえで、必要な点を確認させてください。",
    businessReason: "感情ではなく、確認事項として伝える形にしています。",
    young: "困っているところがあれば、一緒に確認していきましょう。",
    youngReason: "相手が相談しやすい雰囲気を残しています。"
  };
}

function showResult(result) {
  categoryText.textContent = result.category;
  categoryReason.textContent = result.categoryReason;

  softText.textContent = result.soft;
  softReason.textContent = result.softReason;

  businessText.textContent = result.business;
  businessReason.textContent = result.businessReason;

  youngText.textContent = result.young;
  youngReason.textContent = result.youngReason;

  resultArea.classList.remove("hidden");
  resultArea.scrollIntoView({ behavior: "smooth", block: "start" });
}

convertButton.addEventListener("click", () => {
  const input = userInput.value.trim();

  if (input === "") {
    alert("変換したい言葉を入力してください。");
    return;
  }

  const result = findPattern(input) || createDefaultResult();
  showResult(result);
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
