import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

import styles from "./style.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export default function input({ ...rest }: InputProps) {
   return <input className={styles.input} {...rest}></input>;
}

export function TextArea({ ...rest }: TextAreaProps) {
   return <textarea className={styles.input}></textarea>;
}
