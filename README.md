# 🚀 TypeSpace

A beginner-friendly **Typing Speed Test** web application that combines **C**, **Python Flask**, and **Bootstrap**.  
The app displays a random paragraph, allows the user to type it, and calculates **accuracy**, **words per minute (WPM)**, and **typing errors**.

---

## 1️⃣ C Program: `typing.c`

This program calculates typing results and prints **JSON** output.  

### Features
- Counts the number of words typed
- Calculates accuracy compared to a random paragraph
- Counts errors
- Computes WPM (Words Per Minute)
- Outputs all results in JSON format

### Code Summary
- Compares typed text with a random paragraph
- Uses `isspace()` to count words
- Calculates accuracy as `(correct characters / total characters) * 100`
- Calculates WPM as `(word count / minutes)`

### Compile & Run

```bash
gcc typing_speed_random.c -o typing_logic
chmod +x typing_logic
./typing_logic "Your typed text" 60
