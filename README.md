# 🚀 Lighthouse Audit Toolkit

A simple and powerful Node.js script to run automated SEO, UX, and performance audits on any website using Google’s Lighthouse.

---

## 🎯 Why Lighthouse Audit Toolkit?

Running detailed audits manually can be tedious and time-consuming. With Lighthouse Audit Toolkit, you can quickly perform audits on multiple URLs simultaneously, generating structured CSV reports. Perfect for developers, SEO specialists, or UX/UI experts who need actionable insights for improving website performance.

---

## 🛠 Key Features

- Batch audit multiple URLs using Lighthouse.
- Export detailed results directly to CSV format.
- Includes vital metrics like performance, accessibility, SEO, best practices, page titles, meta descriptions, and headings (H1, H2).
- Supports both desktop and mobile audits.
- Simple setup, zero complexity.

---

## 📦 What’s Included?

- `audit.js`: Core script leveraging Lighthouse for automated audits.
- `urls.txt`: Example list of URLs to audit.
- Automatically generated `lighthouse-results.csv` file for easy analysis.

## ✅ Getting Started

Follow these steps to set up your audit:

### 1. Clone this Repository

```bash
    git clone https://github.com/jamaldols/lighthouse-audit-toolkit.git
    cd lighthouse-audit-toolkit
```

### 2. Install Dependencies

```bash
    npm install
```

### 3. Prepare Your URLs

Edit `urls.txt` and add one URL per line:

```bash
    https://www.example.com
    https://www.another-example.com
```

### 4. Run your audit

Edit `urls.txt` and add one URL per line:

```bash
    node audit.js
```

### 5. Check Your Results

Open the generated CSV file (`lighthouse-results.csv`) to see your audit results.

## 📊 Audit Metrics Included

The script extracts and reports the following data:

- **Performance (Mobile & Desktop)**
- **Accessibility Score**
- **SEO Score**
- **Best Practices Score**
- **Page Titles**
- **Meta Descriptions**
- **H1 and H2 Headings**

---

## 🚦 Use Cases

- **SEO Audits**: Quickly pinpoint pages with low SEO scores or missing meta descriptions.
- **UX Improvements**: Identify accessibility issues or poor user experiences through objective metrics.
- **Performance Optimization**: Find pages needing speed or Core Web Vitals enhancements.

---

## 🔮 Roadmap

Future improvements include:

- Integrating with Google Search Console API.
- Detailed visual dashboards and PDF reporting.
- Support for custom Lighthouse configurations.

---

## 🤝 Contributing

Feel free to fork, open issues, submit PRs, or suggest features. Contributions are warmly welcomed!

---

## 📄 License

Distributed under the MIT License.
