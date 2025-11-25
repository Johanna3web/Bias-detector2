import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Set PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const parseFile = async (file) => {
  const fileType = file.name.split('.').pop().toLowerCase();
  
  try {
    switch (fileType) {
      case 'csv':
        return await parseCSV(file);
      case 'xlsx':
      case 'xls':
        return await parseExcel(file);
      case 'json':
        return await parseJSON(file);
      case 'txt':
        return await parseTXT(file);
      case 'pdf':
        return await parsePDF(file);
      case 'docx':
        return await parseDOCX(file);
      default:
        throw new Error(`Unsupported file type: ${fileType}`);
    }
  } catch (error) {
    throw new Error(`Failed to parse file: ${error.message}`);
  }
};

const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve({
          type: 'csv',
          data: results.data,
          preview: results.data.slice(0, 10),
          columns: results.meta.fields || []
        });
      },
      error: (error) => reject(error)
    });
  });
};

const parseExcel = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        
        resolve({
          type: 'excel',
          data: jsonData,
          preview: jsonData.slice(0, 10),
          columns: Object.keys(jsonData[0] || {})
        });
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read Excel file'));
    reader.readAsArrayBuffer(file);
  });
};

const parseJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];
        
        resolve({
          type: 'json',
          data: dataArray,
          preview: dataArray.slice(0, 10),
          columns: Object.keys(dataArray[0] || {}),
          raw: e.target.result
        });
      } catch (error) {
        reject(new Error('Invalid JSON format'));
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read JSON file'));
    reader.readAsText(file);
  });
};

const parseTXT = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n').filter(line => line.trim());
      
      resolve({
        type: 'txt',
        data: lines,
        preview: lines.slice(0, 20),
        text: text
      });
    };
    
    reader.onerror = () => reject(new Error('Failed to read text file'));
    reader.readAsText(file);
  });
};

const parsePDF = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const typedArray = new Uint8Array(e.target.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        let fullText = '';
        
        // Extract text from first 5 pages
        const numPages = Math.min(pdf.numPages, 5);
        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join(' ');
          fullText += pageText + '\n';
        }
        
        const lines = fullText.split('\n').filter(line => line.trim());
        
        resolve({
          type: 'pdf',
          data: lines,
          preview: lines.slice(0, 20),
          text: fullText,
          pages: pdf.numPages
        });
      } catch (error) {
        reject(new Error('Failed to parse PDF'));
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read PDF file'));
    reader.readAsArrayBuffer(file);
  });
};

const parseDOCX = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target.result;
        const result = await mammoth.extractRawText({ arrayBuffer });
        const text = result.value;
        const lines = text.split('\n').filter(line => line.trim());
        
        resolve({
          type: 'docx',
          data: lines,
          preview: lines.slice(0, 20),
          text: text
        });
      } catch (error) {
        reject(new Error('Failed to parse DOCX'));
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read DOCX file'));
    reader.readAsArrayBuffer(file);
  });
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
