import multer from "multer";
import path from "path";

export const upload = multer({
  storage: multer.diskStorage({
    destination: async (req, file, callBack) => {
      callBack(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, callBack) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 10);
      callBack(
        null,
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
      );
    },
  }),
});
