import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { Button, View } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';

export default function TabTwoScreen() {

const App = () => {
  const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #4CAF50; }
          p { font-size: 14px; }
          .footer { font-size: 10px; color: #777; text-align: center; margin-top: 20px; }
        </style>
      </head>
      <body>
        <h1>Reporte PDF</h1>
        <p>Este es un ejemplo de contenido de PDF en React Native.</p>
        <div class="footer">Generado el ${new Date().toLocaleDateString()}</div>
      </body>
    </html>
  `;

  const createPDF = async () => {
    const options = {
      html: htmlContent,
      fileName: 'reporte',
      directory: 'Documents',
    };

    try {
      const file = await RNHTMLtoPDF.convert(options);
      console.log(`PDF generado en: ${file.filePath}`);
      return file.filePath;
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  const openPDF = async () => {
    const pdfPath = await createPDF();
    if (pdfPath) {
      try {
        await FileViewer.open(pdfPath);
      } catch (error) {
        console.error("Error al abrir el PDF:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Generar y Abrir PDF" onPress={openPDF} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

}

