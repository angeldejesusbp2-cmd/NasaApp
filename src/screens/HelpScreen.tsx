import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface HelpScreenProps {
  navigation?: any;
}

export default function HelpScreen({ navigation }: HelpScreenProps) {
  const [expandedFAQ, setExpandedFAQ] = React.useState<string | null>(null);

  const faqs = [
    {
      id: '1',
      question: '¿Cómo busco contenido?',
      answer:
        'Dirígete a la pestaña de Búsqueda e ingresa palabras clave como "galaxias", "asteroide" o "Marte". Los resultados aparecerán al presionar el botón de búsqueda.',
    },
    {
      id: '2',
      question: '¿Cómo guardo favoritos?',
      answer:
        'Presiona el icono de corazón en cualquier imagen o artículo para guardarlo en tus favoritos. Puedes verlos en la pestaña de Favoritos.',
    },
    {
      id: '3',
      question: '¿De dónde viene el contenido?',
      answer:
        'Todo el contenido proviene de la API oficial de la NASA, asegurando información actualizada y confiable sobre el espacio y la astronomía.',
    },
    {
      id: '4',
      question: '¿Puedo descargar imágenes?',
      answer:
        'Sí, presiona el icono de descarga en la pantalla de detalles para guardar imágenes en alta resolución en tu dispositivo.',
    },
    {
      id: '5',
      question: '¿Cómo cambio el idioma?',
      answer:
        'Ve a Ajustes > Idioma y selecciona tu idioma preferido. La app se reiniciará con el nuevo idioma.',
    },
    {
      id: '6',
      question: '¿La app requiere conexión a internet?',
      answer:
        'Sí, la app necesita conexión para obtener contenido de la NASA. Sin embargo, puedes ver el contenido descargado sin conexión.',
    },
  ];

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation?.goBack()}
      >
        <Text style={styles.backButtonText}>← Atrás</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Centro de Ayuda</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>

        {faqs.map((faq) => (
          <TouchableOpacity
            key={faq.id}
            style={styles.faqItem}
            onPress={() => toggleFAQ(faq.id)}
          >
            <View style={styles.faqHeader}>
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <Text style={styles.faqToggle}>
                {expandedFAQ === faq.id ? '−' : '+'}
              </Text>
            </View>

            {expandedFAQ === faq.id && (
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contacto</Text>

        <TouchableOpacity style={styles.contactItem}>
          <Text style={styles.contactIcon}>📧</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Correo electrónico</Text>
            <Text style={styles.contactValue}>support@nasaapp.com</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactItem}>
          <Text style={styles.contactIcon}>🌐</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Sitio web</Text>
            <Text style={styles.contactValue}>www.nasaapp.com</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactItem}>
          <Text style={styles.contactIcon}>📱</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Redes sociales</Text>
            <Text style={styles.contactValue}>@nasaapp</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información</Text>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Versión</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Desarrollador</Text>
          <Text style={styles.infoValue}>NASA App Team</Text>
        </View>

        <TouchableOpacity style={styles.infoItem}>
          <Text style={styles.infoLabel}>Términos de servicio</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoItem}>
          <Text style={styles.infoLabel}>Política de privacidad</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f0f0ff',
    padding: 16,
  },
  backButton: {
    padding: 8,
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#0066cc',
    fontWeight: '600',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  faqItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  faqToggle: {
    fontSize: 20,
    color: '#0066cc',
    fontWeight: 'bold',
    marginLeft: 12,
  },
  faqAnswer: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  contactItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 13,
    color: '#999',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0066cc',
  },
  infoItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  infoValue: {
    fontSize: 14,
    color: '#999',
  },
  arrow: {
    fontSize: 20,
    color: '#ccc',
  },
});
