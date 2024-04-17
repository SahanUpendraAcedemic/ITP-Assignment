import ExcelJS from 'exceljs';

export const generateExcelFile = async (items) => {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('LostItems');

    // Define headers
    worksheet.columns = [
        { header: 'Item ID', key: 'itemId', width: 15 },
        { header: 'Item Name', key: 'itemName', width: 25 },
        { header: 'Item Type', key: 'itemType', width: 20 },
        { header: 'Physical Quantity', key: 'physicalQuantity', width: 20 },
        { header: 'System Quantity', key: 'systemQuantity', width: 20 },
        { header: 'Variance', key: 'variance', width: 15 },
        { header: 'Description', key: 'description', width: 30 }
    ];

    // Add data rows
    items.forEach(item => {
        worksheet.addRow({
            itemId: item.itemId,
            itemName: item.itemName,
            itemType: item.itemType,
            physicalQuantity: item.physicalQuantity,
            systemQuantity: item.systemQuantity,
            variance: item.variance,
            description: item.description
        });
    });

    // Generate Excel file buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};
