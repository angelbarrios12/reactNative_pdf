import { StyleSheet, Alert } from 'react-native';
import React from 'react';
import { Button, View } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system'; // Importa FileSystem para leer el archivo

export default function TabTwoScreen() {

  const createAndSharePDF = async () => {
    const htmlContent = `
        <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Inspección Mensual de Extintores</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            max-width: 1400px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .header-info {
            display: flex;
            justify-content: space-between;
            margin: 20px 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #dee2e6;
            padding: 2px;
            text-align: center;
        }
        th {
            background-color: #f8f9fa;
            font-weight: bold;
            position: relative;
        }
        .vertical-header {
            writing-mode: vertical-rl;
            transform: rotate(180deg);
            white-space: nowrap;
            min-height: 120px;
            margin: auto;
            text-align: left;
            padding: 4px 0;
            font-size: 7px; /* Tamaño de letra ajustado a 7px */
        }
        .check-column {
            width: 60px;
            padding: 0;
        }
        .check-header {
            height: 140px;
            position: relative;
        }
        .check-subheader {
            display: flex;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            border-top: 1px solid #dee2e6;
        }
        .check-subheader div {
            width: 50%;
            padding: 2px 0;
            text-align: center;
            font-weight: normal;
            font-size: 7px; /* Tamaño de letra ajustado a 7px */
        }
        .check-subheader div:first-child {
            border-right: 1px solid #dee2e6;
        }
        .check-cell {
            display: flex;
            height: 100%;
        }
        .check-cell div {
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2px 0;
        }
        .check-cell div:first-child {
            border-right: 1px solid #dee2e6;
        }
        input[type="text"] {
            width: 95%;
            padding: 2px;
            border: 1px solid #dee2e6;
            font-size: 12px;
        }
        input[type="checkbox"] {
            width: 12px;
            height: 12px;
            margin: 0;
            padding: 0;
        }
        .text-column {
            min-width: 80px;
        }
        tr:nth-child(even) {
            background-color: #f8f9fa;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 style="font-size: 16px;">Inspección Mensual de Extintores</h1>
        <div class="header-info">
            <div>MES: <input type="text"></div>
            <div>REVISÓ: <input type="text"></div>
            <div>VERIFICÓ: <input type="text"></div>
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th style="width: 30px; font-size: 7px;">No.</th>
                <th class="text-column">
                    <div class="vertical-header">Ubicación</div>
                </th>
                <th class="text-column">
                    <div class="vertical-header">Fecha de Carga</div>
                </th>
                <th class="text-column">
                    <div class="vertical-header">Tipo de Extintor</div>
                </th>
                <th class="text-column">
                    <div class="vertical-header">Capacidad en Kilos</div>
                </th>
                <th class="check-column">
                    <div class="check-header">
                        <div class="vertical-header">Nemotecnia de Funcionamiento</div>
                        <div class="check-subheader">
                            <div>B</div>
                            <div>M</div>
                        </div>
                    </div>
                </th>
                <th class="check-column">
                    <div class="check-header">
                        <div class="vertical-header">Pictograma de las Clases de Fuego</div>
                        <div class="check-subheader">
                            <div>B</div>
                            <div>M</div>
                        </div>
                    </div>
                </th>
                <th class="check-column">
                    <div class="check-header">
                        <div class="vertical-header">Extintor en Lugar Visible</div>
                        <div class="check-subheader">
                            <div>B</div>
                            <div>M</div>
                        </div>
                    </div>
                </th>
                <th class="check-column">
                    <div class="check-header">
                        <div class="vertical-header">Altura Adecuada</div>
                        <div class="check-subheader">
                            <div>B</div>
                            <div>M</div>
                        </div>
                    </div>
                </th>
                <th class="check-column">
                    <div class="check-header">
                        <div class="vertical-header">Estado de los Sellos</div>
                        <div class="check-subheader">
                            <div>B</div>
                            <div>M</div>
                        </div>
                    </div>
                </th>
                <th class="check-column">
                    <div class="check-header">
                        <div class="vertical-header">Estado de Mangueras</div>
                        <div class="check-subheader">
                            <div>B</div>
                            <div>M</div>
                        </div>
                    </div>
                </th>
                <th class="check-column">
                    <div class="check-header">
                        <div class="vertical-header">Estado de Boquilla</div>
                        <div class="check-subheader">
                            <div>B</div>
                            <div>M</div>
                        </div>
                    </div>
                </th>
                <th class="check-column">
                    <div class="check-header">
                        <div class="vertical-header">Estado de Manómetro</div>
                        <div class="check-subheader">
                            <div>B</div>
                            <div>M</div>
                        </div>
                    </div>
                </th>
                <th class="check-column">
                    <div class="check-header">
                        <div class="vertical-header">Condición de Ruedas</div>
                        <div class="check-subheader">
                            <div>B</div>
                            <div>M</div>
                        </div>
                    </div>
                </th>
                <th class="check-column">
                    <div class="check-header">
                        <div class="vertical-header">Presión del Manómetro</div>
                        <div class="check-subheader">
                            <div>B</div>
                            <div>M</div>
                        </div>
                    </div>
                </th>
                <th class="check-column">
                    <div class="check-header">
                        <div class="vertical-header">Placa o Etiqueta Legible</div>
                        <div class="check-subheader">
                            <div>B</div>
                            <div>M</div>
                        </div>
                    </div>
                </th>
                <th class="check-column">
                    <div class="check-header">
                        <div class="vertical-header">Fecha de Prueba Hidrostática</div>
                        <div class="check-subheader">
                            <div>B</div>
                            <div>M</div>
                        </div>
                    </div>
                </th>
                <th class="text-column">
                    <div class="vertical-header">Observaciones</div>
                </th>
            </tr>
        </thead>
        <tbody>
          
        </tbody>
    </table>
</body>
</html>
    `;
    
    /*
      <script>
                for(let i = 1; i <= 22; i++) {
                    document.write(`
                        <tr>
                            <td>${i}</td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            ${Array(12).fill().map(() => `
                                <td class="check-column">
                                    <div class="check-cell">
                                        <div><input type="checkbox"></div>
                                        <div><input type="checkbox"></div>
                                    </div>
                                </td>
                            `).join('')}
                            <td><input type="text"></td>
                        </tr>
                    `);
                }
            </script>
    */
    try {
      // Genera el PDF a partir del contenido HTML
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      console.log('PDF generado en:', uri);

      // Lee el archivo PDF como Base64
      const pdfBase64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log('PDF en Base64:', pdfBase64);

      // Verifica si la función de compartir está disponible
      if (await Sharing.isAvailableAsync()) {
        // Compartir el PDF en Base64 (Nota: esto requiere que el receptor pueda manejar Base64)
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert("Compartir no está disponible en este dispositivo.");
      }
    } catch (error) {
      console.error("Error al generar o compartir el PDF:", error);
      Alert.alert("Hubo un error al generar o compartir el PDF.");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Generar y Compartir PDF" onPress={createAndSharePDF} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

