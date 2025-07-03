import config from "../config";
import winston, { level } from 'winston';
const {combine,timestamp,json,errors,align,printf,colorize}=winston.format;
const transports:winston.transport[]=[];
if(config.NODE_ENV === "production") {
    transports.push(
        new winston.transports.Console({
            format: combine(
                colorize({ all: true }),          // تلوين جميع الرسائل
                timestamp({ format: "YYYY-MM-DD hh:mm:ss A" }), // إضافة الطابع الزمني
                align(),                          // محاذاة النص
                printf(({ timestamp, level, message, ...meta }) => {
                    const metaStr = Object.keys(meta).length ? `\n${JSON.stringify(meta)}` : '';
                    return `${timestamp} [${level.toUpperCase()}]: ${message}${metaStr}`
                }),
            )
        })
    )
}
const logger=winston.createLogger({
    level:config.LOG_LEVEL|| `info`,
    format:combine(timestamp(),errors({stack:true}),json()),
    transports,
    silent:config.NODE_ENV==="test",
});
export {logger}