
export const faqData = [
    { question: "What is the difference between lossy and lossless compression?", answer: "Lossless compression (used by formats like PNG, WAV, ZIP) reduces file size without discarding any data, so the original can be perfectly restored. Lossy compression (used by JPG, MP3, MP4) achieves much smaller file sizes by permanently removing data that the human eye or ear is unlikely to notice. This tool helps estimate the size change, which is most dramatic when converting between these two types." },
    { question: "Why would converting a JPG to a PNG make the file larger?", answer: "JPG uses lossy compression, discarding data to save space. PNG uses lossless compression, preserving all data. When you convert a JPG to a PNG, you are taking the already-compressed image data and saving it in a format that doesn't discard anything, which often results in a larger file size than the highly optimized JPG." },
    { question: "Is this estimate accurate?", answer: "This is a high-level estimate based on typical conversion ratios. The actual final file size will depend heavily on the content of the file (e.g., a complex photo vs. a simple graphic) and the quality settings you choose during the conversion process. Use this tool for planning, not for exact predictions." },
    { question: "Which image format should I use for the web?", answer: "Generally, use JPG for photographs and complex images. Use PNG for graphics with sharp lines, text, or when you need a transparent background (like logos). Modern formats like WebP and AVIF often provide better compression than both and are excellent choices if your target browsers support them." },
    { question: "Why would I convert a DOCX to a PDF?", answer: "Converting a DOCX to a PDF ensures that your document's layout, fonts, and formatting will look identical on any device, regardless of whether the user has Microsoft Word. It creates a self-contained, read-only version that's ideal for sharing, printing, and archiving." },
    { question: "What is the trade-off when converting WAV to MP3?", answer: "You are trading file size for audio quality. WAV is a lossless audio format that contains the full, uncompressed sound data, resulting in very large files. MP3 is a lossy format that intelligently removes sounds that are hard for humans to hear, resulting in a much smaller file that is ideal for streaming and portable devices. The trade-off is a slight loss in audio fidelity that may or may not be perceptible." },
    { question: "Is this tool performing the actual file conversion?", answer: "No. This tool is an estimator only. It does not upload or process your files. It uses pre-defined average compression ratios to provide a quick estimate of the potential file size change." },
];

export const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Estimate File Conversion Size',
    description: 'A step-by-step guide to estimating the file size change when converting between formats.',
    step: [
        { '@type': 'HowToStep', name: 'Enter Original Size', text: 'Input the size of your source file and select its unit (KB, MB, GB).' },
        { '@type': 'HowToStep', name: 'Select Conversion Type', text: 'Choose the category of your file (Image, Document, or Audio).' },
        { '@type': 'HowToStep', name: 'Choose Formats', text: 'Select the format you are converting from and the format you are converting to.' },
        { '@type': 'HowToStep', name: 'Estimate New Size', text: 'Click the "Estimate New Size" button to see the estimated size of the converted file and the percentage change.' }
    ],
    totalTime: 'PT1M'
};

export const keyTerminologies = [
    { term: 'File Format', definition: 'A standard way that information is encoded for storage in a computer file (e.g., .jpg, .pdf, .mp3).' },
    { term: 'Compression', definition: 'The process of reducing the number of bits needed to represent data, thereby reducing file size.' },
    { term: 'Lossless Compression', definition: 'A compression method that reduces file size without any loss of quality. The original data can be perfectly reconstructed (e.g., PNG, FLAC, ZIP).' },
    { term: 'Lossy Compression', definition: 'A compression method that achieves smaller file sizes by permanently discarding some data, usually information that is least perceptible to humans (e.g., JPG, MP3).' },
    { term: 'PNG (Portable Network Graphics)', definition: 'A lossless image format that supports transparency, ideal for graphics, logos, and screenshots.' },
    { term: 'JPG (Joint Photographic Experts Group)', definition: 'A lossy image format that is highly effective for compressing photographs and other complex images.' },
    { term: 'PDF (Portable Document Format)', definition: 'A file format developed by Adobe to present documents, including text formatting and images, in a manner independent of application software, hardware, and operating systems.' },
    { term: 'WAV (Waveform Audio File Format)', definition: 'An uncompressed, lossless audio format that is a standard for professional audio and studio recording.' },
    { term: 'MP3 (MPEG-1 Audio Layer III)', definition: 'A widely used lossy audio format that provides a good balance between file size and sound quality, making it ideal for music streaming and storage.' }
];
