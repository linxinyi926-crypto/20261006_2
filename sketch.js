// 儲存五道測驗題目
const quizQuestions = [
  // 第一題
  {
    // 題目文字
    question: "在 p5.js 中，哪一個函式會在程式開始時執行一次？",
    // 四個選項
    options: ["draw()", "setup()", "start()", "begin()"],
    // 正確答案是第二個選項
    answer: 1
  },

  // 第二題
  {
    // 題目文字
    question: "在 p5.js 中，哪一個函式會持續重複執行？",
    // 四個選項
    options: ["setup()", "loop()", "draw()", "repeat()"],
    // 正確答案是第三個選項
    answer: 2
  },

  // 第三題
  {
    // 題目文字
    question: "下列哪一個指令可以在畫布上繪製橢圓形？",
    // 四個選項
    options: ["circle()", "ellipse()", "round()", "oval()"],
    // 正確答案是第二個選項
    answer: 1
  },

  // 第四題
  {
    // 題目文字
    question: "在 p5.js 中，哪一個指令可以設定背景顏色？",
    // 四個選項
    options: [
      "background()",
      "bgColor()",
      "setBackground()",
      "colorBackground()"
    ],
    // 正確答案是第一個選項
    answer: 0
  },

  // 第五題
  {
    // 題目文字
    question: "哪一個指令可以建立符合視窗大小的畫布？",
    // 四個選項
    options: [
      "createCanvas(fullscreen)",
      "createCanvas(windowWidth, windowHeight)",
      "fullCanvas()",
      "screenCanvas()"
    ],
    // 正確答案是第二個選項
    answer: 1
  }
];

// 儲存目前題目編號
let currentQuestion = 0;

// 儲存答對題數
let correctCount = 0;

// 儲存是否已經作答
let hasAnswered = false;

// 儲存使用者選取的選項
let selectedOption = -1;

// 儲存是否答錯
let isWrong = false;

// 儲存內容區域左側位置
let contentX = 0;

// 儲存內容區域寬度
let contentWidth = 0;

// 儲存選項高度
let optionHeight = 0;

// 儲存選項間距
let optionGap = 0;

// 儲存按鈕位置與尺寸
let buttonX = 0;
let buttonY = 0;
let buttonWidth = 0;
let buttonHeight = 0;

// 建立畫布
function setup() {
  // 建立符合瀏覽器視窗大小的畫布
  createCanvas(windowWidth, windowHeight);

  // 設定文字水平置中
  textAlign(CENTER, CENTER);

  // 設定文字使用無襯線字型
  textFont("sans-serif");

  // 設定畫布不使用外框
  noStroke();

  // 取得 p5.js 畫布元素
  const canvasElement = document.querySelector("canvas");

  // 確認畫布元素存在
  if (canvasElement) {
    // 避免手機觸控時觸發瀏覽器縮放
    canvasElement.style.touchAction = "manipulation";

    // 讓畫布以區塊方式顯示
    canvasElement.style.display = "block";
  }

  // 更新響應式版面
  updateLayout();
}

// 每一幀繪製畫面
function draw() {
  // 設定背景顏色
  background("#f7f9fc");

  // 更新響應式版面
  updateLayout();

  // 判斷是否完成全部題目
  if (currentQuestion >= quizQuestions.length) {
    // 顯示成績畫面
    drawResultScreen();
  } else {
    // 顯示測驗畫面
    drawQuizScreen();
  }
}

// 更新響應式版面
function updateLayout() {
  // 設定頁面左右邊距
  const pagePadding = constrain(width * 0.06, 16, 48);

  // 設定內容最大寬度
  const maxContentWidth = 820;

  // 計算內容寬度
  contentWidth = min(width - pagePadding * 2, maxContentWidth);

  // 確保內容寬度不會太小
  contentWidth = max(contentWidth, 220);

  // 計算內容區域左側位置
  contentX = (width - contentWidth) / 2;

  // 設定選項高度
  optionHeight = constrain(width * 0.075, 48, 68);

  // 設定選項間距
  optionGap = constrain(width * 0.018, 8, 16);

  // 設定按鈕寬度
  buttonWidth = min(contentWidth, 280);

  // 設定按鈕高度
  buttonHeight = constrain(width * 0.075, 48, 62);

  // 計算按鈕水平位置
  buttonX = width / 2 - buttonWidth / 2;

  // 計算按鈕垂直位置
  buttonY = height - buttonHeight - 24;
}

// 繪製測驗畫面
function drawQuizScreen() {
  // 取得目前題目
  const quiz = quizQuestions[currentQuestion];

  // 設定標題文字大小
  textSize(getTextSize(32, 22));

  // 設定標題文字顏色
  fill("#23395d");

  // 顯示測驗標題
  text("p5.js 指令小測驗", width / 2, 42);

  // 設定進度文字大小
  textSize(getTextSize(17, 13));

  // 設定進度文字顏色
  fill("#64748b");

  // 顯示目前題數
  text(
    "第 " + (currentQuestion + 1) + " 題／共 " + quizQuestions.length + " 題",
    width / 2,
    78
  );

  // 設定題目文字大小
  textSize(getTextSize(25, 17));

  // 設定題目文字顏色
  fill("#172033");

  // 取得換行後的題目文字
  const questionLines = wrapText(quiz.question, contentWidth);

  // 設定題目起始位置
  const questionY = 120;

  // 設定題目行高
  const questionLineHeight = getTextSize(32, 23);

  // 繪製題目文字
  for (let i = 0; i < questionLines.length; i++) {
    // 繪製每一行題目
    text(
      questionLines[i],
      width / 2,
      questionY + i * questionLineHeight
    );
  }

  // 計算選項開始位置
  const optionsY =
    questionY +
    questionLines.length * questionLineHeight +
    24;

  // 繪製四個選項
  for (let i = 0; i < quiz.options.length; i++) {
    // 計算選項垂直位置
    let y = optionsY + i * (optionHeight + optionGap);

    // 答錯時讓正確選項上下跳動
    if (isWrong && i === quiz.answer) {
      // 使用正弦函式製作跳動效果
      y += sin(frameCount * 0.15) * 8;
    }

    // 繪製選項
    drawOption(quiz.options[i], i, y);
  }

  // 如果已經作答，顯示按鈕
  if (hasAnswered) {
    // 判斷按鈕文字
    const label =
      currentQuestion === quizQuestions.length - 1
        ? "查看成績"
        : "下一題";

    // 繪製按鈕
    drawButton(label, buttonX, buttonY, buttonWidth, buttonHeight);
  } else {
    // 尚未作答時顯示操作提示
    textSize(getTextSize(16, 12));
    fill("#64748b");
    text("請點選一個選項作答", width / 2, height - 28);
  }
}

// 繪製單一選項
function drawOption(optionText, optionIndex, y) {
  // 取得目前題目
  const quiz = quizQuestions[currentQuestion];

  // 設定預設背景顏色
  let optionColor = "#ffffff";

  // 答錯時，正確答案使用指定背景色
  if (isWrong && optionIndex === quiz.answer) {
    // 套用 #c7f9cc 淡綠色
    optionColor = "#c7f9cc";
  }

  // 答對時，使用者選取的答案使用藍色
  if (!isWrong && hasAnswered && optionIndex === selectedOption) {
    // 設定答對選項顏色
    optionColor = "#bde0fe";
  }

  // 答錯時，使用者選錯的答案使用淡紅色
  if (isWrong && optionIndex === selectedOption) {
    // 設定錯誤選項顏色
    optionColor = "#ffd6d6";
  }

  // 設定選項填色
  fill(optionColor);

  // 繪製選項背景
  rect(contentX, y, contentWidth, optionHeight, 12);

  // 設定選項外框顏色
  stroke("#d6deeb");

  // 設定外框寬度
  strokeWeight(2);

  // 設定外框不填色
  noFill();

  // 繪製選項外框
  rect(contentX, y, contentWidth, optionHeight, 12);

  // 關閉外框
  noStroke();

  // 設定選項文字顏色
  fill("#172033");

  // 設定選項文字大小
  textSize(getTextSize(20, 14));

  // 加上選項英文字母
  const fullText =
    String.fromCharCode(65 + optionIndex) + ". " + optionText;

  // 將選項文字換行
  const lines = wrapText(fullText, contentWidth * 0.88);

  // 設定文字行高
  const lineHeight = getTextSize(24, 18);

  // 計算文字起始位置
  const startY =
    y +
    optionHeight / 2 -
    ((lines.length - 1) * lineHeight) / 2;

  // 逐行繪製選項文字
  for (let i = 0; i < lines.length; i++) {
    // 繪製選項文字
    text(lines[i], width / 2, startY + i * lineHeight);
  }
}

// 繪製按鈕
function drawButton(label, x, y, w, h) {
  // 設定按鈕背景色
  fill("#4361ee");

  // 繪製按鈕
  rect(x, y, w, h, 14);

  // 設定按鈕文字顏色
  fill("#ffffff");

  // 設定按鈕文字大小
  textSize(getTextSize(20, 15));

  // 顯示按鈕文字
  text(label, x + w / 2, y + h / 2);
}

// 繪製成績畫面
function drawResultScreen() {
  // 設定標題文字大小
  textSize(getTextSize(36, 24));

  // 設定標題文字顏色
  fill("#23395d");

  // 顯示完成文字
  text("測驗完成！", width / 2, height * 0.26);

  // 設定成績文字大小
  textSize(getTextSize(30, 21));

  // 設定成績文字顏色
  fill("#172033");

  // 顯示答對題數
  text(
    "你答對了 " + correctCount + "／" + quizQuestions.length + " 題",
    width / 2,
    height * 0.4
  );

  // 設定鼓勵文字大小
  textSize(getTextSize(18, 14));

  // 設定鼓勵文字顏色
  fill("#64748b");

  // 設定預設鼓勵文字
  let message = "多練習幾次就會更熟悉！";

  // 判斷是否全部答對
  if (correctCount === quizQuestions.length) {
    // 設定全對訊息
    message = "太厲害了，全部答對！";
  }

  // 判斷是否答對三題以上
  if (correctCount >= 3 && correctCount < quizQuestions.length) {
    // 設定高分訊息
    message = "表現很好，再接再厲！";
  }

  // 顯示鼓勵訊息
  text(message, width / 2, height * 0.49);

  // 設定結果按鈕位置
  const resultButtonY = height * 0.62;

  // 繪製重新測驗按鈕
  drawButton(
    "重新測驗",
    buttonX,
    resultButtonY,
    buttonWidth,
    buttonHeight
  );
}

// 將文字依照寬度換行
function wrapText(content, maxWidth) {
  // 建立文字行陣列
  const lines = [];

  // 儲存目前文字行
  let currentLine = "";

  // 逐字處理文字
  for (let i = 0; i < content.length; i++) {
    // 取得目前字元
    const character = content[i];

    // 測試加入字元後的文字
    const testLine = currentLine + character;

    // 判斷是否超過最大寬度
    if (textWidth(testLine) > maxWidth && currentLine.length > 0) {
      // 儲存目前文字行
      lines.push(currentLine);

      // 建立下一行
      currentLine = character;
    } else {
      // 更新目前文字行
      currentLine = testLine;
    }
  }

  // 儲存最後一行文字
  if (currentLine.length > 0) {
    // 加入最後一行
    lines.push(currentLine);
  }

  // 回傳文字行陣列
  return lines;
}

// 取得響應式文字大小
function getTextSize(desktopSize, mobileSize) {
  // 根據畫布寬度計算文字大小
  const calculatedSize = width * 0.045;

  // 將文字大小限制在手機與電腦範圍
  return constrain(calculatedSize, mobileSize, desktopSize);
}

// 處理滑鼠點擊
function mousePressed() {
  // 處理滑鼠位置
  handlePointer(mouseX, mouseY);

  // 阻止瀏覽器預設行為
  return false;
}

// 處理觸控開始事件
function touchStarted() {
  // 確認有觸控點
  if (touches.length > 0) {
    // 處理第一個觸控點
    handlePointer(touches[0].x, touches[0].y);
  }

  // 阻止手機瀏覽器預設行為
  return false;
}

// 處理點擊位置
function handlePointer(x, y) {
  // 判斷目前是否在結果頁
  if (currentQuestion >= quizQuestions.length) {
    // 計算結果頁按鈕位置
    const resultButtonY = height * 0.62;

    // 判斷是否點擊重新測驗
    if (
      x >= buttonX &&
      x <= buttonX + buttonWidth &&
      y >= resultButtonY &&
      y <= resultButtonY + buttonHeight
    ) {
      // 重設測驗
      resetQuiz();
    }

    // 結束函式
    return;
  }

  // 尚未作答時才可以選擇答案
  if (!hasAnswered) {
    // 取得目前題目
    const quiz = quizQuestions[currentQuestion];

    // 設定題目文字大小
    textSize(getTextSize(25, 17));

    // 取得題目換行結果
    const questionLines = wrapText(quiz.question, contentWidth);

    // 設定題目行高
    const questionLineHeight = getTextSize(32, 23);

    // 計算選項起始位置
    const optionsY =
      120 +
      questionLines.length * questionLineHeight +
      24;

    // 檢查四個選項
    for (let i = 0; i < quiz.options.length; i++) {
      // 計算目前選項位置
      const optionY =
        optionsY + i * (optionHeight + optionGap);

      // 判斷點擊是否位於選項內
      if (
        x >= contentX &&
        x <= contentX + contentWidth &&
        y >= optionY &&
        y <= optionY + optionHeight
      ) {
        // 記錄選取的選項
        selectedOption = i;

        // 設定已作答
        hasAnswered = true;

        // 判斷答案是否正確
        if (selectedOption === quiz.answer) {
          // 答對題數加一
          correctCount++;

          // 設定不是答錯
          isWrong = false;
        } else {
          // 設定答錯
          isWrong = true;
        }

        // 結束迴圈
        break;
      }
    }

    // 結束函式
    return;
  }

  // 判斷是否點擊下一題按鈕
  if (
    x >= buttonX &&
    x <= buttonX + buttonWidth &&
    y >= buttonY &&
    y <= buttonY + buttonHeight
  ) {
    // 進入下一題
    currentQuestion++;

    // 清除作答狀態
    hasAnswered = false;

    // 清除選項狀態
    selectedOption = -1;

    // 清除答錯狀態
    isWrong = false;
  }
}

// 重設測驗
function resetQuiz() {
  // 回到第一題
  currentQuestion = 0;

  // 答對題數歸零
  correctCount = 0;

  // 清除作答狀態
  hasAnswered = false;

  // 清除選取狀態
  selectedOption = -1;

  // 清除答錯狀態
  isWrong = false;
}

// 當視窗大小改變時執行
function windowResized() {
  // 重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);

  // 重新計算版面
  updateLayout();
}