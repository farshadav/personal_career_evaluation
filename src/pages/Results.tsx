import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Results = () => {
  const navigate = useNavigate();
  const reportRef = useRef<HTMLDivElement>(null);

  // Sample data - in a real app, this would come from the quiz answers
  const data = {
    labels: ['Leadership', 'Creativity', 'Technical', 'Communication'],
    datasets: [
      {
        label: 'Your Strengths',
        data: [8, 6, 9, 7],
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Your Strength Profile',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
      },
    },
  };

  const downloadPDF = async () => {
    if (!reportRef.current) return;

    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        logging: false,
        useCORS: true
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');

      pdf.setFontSize(20);
      pdf.text('Thomann Study Results', 105, 15, { align: 'center' });
      pdf.addImage(imgData, 'PNG', 0, 25, imgWidth, imgHeight);
      pdf.save('thomann-study-results.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div ref={reportRef} className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Results</h1>
        
        <div className="mb-8">
          <Bar data={data} options={options} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Top Career Matches</h2>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <span>Technology Leadership</span>
                <span className="font-semibold">92% Match</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Project Management</span>
                <span className="font-semibold">88% Match</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Software Architecture</span>
                <span className="font-semibold">85% Match</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Key Strengths</h2>
            <ul className="space-y-2">
              <li>Strong technical aptitude</li>
              <li>Natural leadership abilities</li>
              <li>Excellent communication skills</li>
              <li>Creative problem-solving</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Start Over
        </button>
        <button
          onClick={downloadPDF}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Download PDF Report
        </button>
      </div>
    </div>
  );
};