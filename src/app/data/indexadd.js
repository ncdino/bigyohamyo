const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const filePath = './food.json'; // 수정할 파일 경로

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('파일을 읽는 중 오류 발생:', err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);

    const updatedJsonData = jsonData.map((item) => ({
      ...item,
      id: uuidv4(),
    }));

    const updatedJsonString = JSON.stringify(updatedJsonData, null, 2); // 들여쓰기 2칸으로 보기 좋게 저장

    fs.writeFile(filePath, updatedJsonString, (err) => {
      if (err) {
        console.error('파일을 쓰는 중 오류 발생:', err);
        return;
      }
      console.log('파일 수정 완료!');
    });
  } catch (parseError) {
    console.error('JSON 파싱 오류:', parseError);
  }
});