export const ReportService = {
    getMeritOrder: () => {
        // Mock ranking data
        const mockRankings = [
            { estudiante_id: 1, nombre: 'Juan Pérez', promedio: 18.5, puesto: 1, facultad: 'Ingeniería' },
            { estudiante_id: 2, nombre: 'Maria Garcia', promedio: 18.2, puesto: 2, facultad: 'Ingeniería' },
            { estudiante_id: 3, nombre: 'Carlos Lopez', promedio: 17.8, puesto: 3, facultad: 'Ingeniería' },
            { estudiante_id: 4, nombre: 'Ana Martinez', promedio: 17.5, puesto: 4, facultad: 'Ingeniería' },
            { estudiante_id: 5, nombre: 'Luis Rodriguez', promedio: 16.9, puesto: 5, facultad: 'Ingeniería' },
        ];
        // Simulate API call
        return new Promise(resolve => {
            setTimeout(() => resolve({ success: true, data: mockRankings }), 500);
        });
    },

    getAcademicReport: () => {
        return new Promise(resolve => {
            setTimeout(() => resolve({
                success: true,
                data: {
                    student: { nombre: 'Juan Pérez', codigo: '2021001' },
                    history: [
                        { curso: 'Matemática I', nota: 16, periodo: '2024-I', creditos: 4 },
                        { curso: 'Física I', nota: 15, periodo: '2024-I', creditos: 4 },
                        { curso: 'Algoritmos', nota: 18, periodo: '2024-II', creditos: 3 },
                    ]
                }
            }), 600);
        });
    }
};
