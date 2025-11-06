export const validateExt= (req, res, next) =>{
  const { ext } = req.body;

  if (!ext) {
    return res.status(400).json({ message: "확장자 명을 입력해주세요." });
  }

  // 영문/숫자만 허용
  const re = /^[a-zA-Z0-9]+$/;

  if (!re.test(ext)) {
    return res.status(400).json({ message: "특수문자는 제외하고 입력해주세요." });
  }

  next();
}