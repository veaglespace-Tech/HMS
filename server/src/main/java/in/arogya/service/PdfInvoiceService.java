package in.arogya.service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import in.arogya.entity.Bill;
import in.arogya.entity.BillItem;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class PdfInvoiceService {

    public byte[] generateInvoicePdf(Bill bill) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, baos);
            document.open();

            // Header
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 22);
            Paragraph title = new Paragraph("ArogyaHMS Hospital", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            document.add(new Paragraph(" ")); // blank line

            // Patient & Bill Info
            document.add(new Paragraph("Bill ID: " + bill.getId()));
            document.add(new Paragraph("Date: " + bill.getBillDate()));
            String patientName = bill.getPatient() != null ? bill.getPatient().getFirstName() + " " + bill.getPatient().getLastName() : "Walk-in";
            document.add(new Paragraph("Patient: " + patientName));
            document.add(new Paragraph("Status: " + bill.getStatus()));
            
            document.add(new Paragraph(" ")); // blank line

            // Items Table
            PdfPTable table = new PdfPTable(4);
            table.setWidthPercentage(100);
            table.setSpacingBefore(10f);
            
            PdfPCell cell1 = new PdfPCell(new Phrase("Category", FontFactory.getFont(FontFactory.HELVETICA_BOLD)));
            PdfPCell cell2 = new PdfPCell(new Phrase("Description", FontFactory.getFont(FontFactory.HELVETICA_BOLD)));
            PdfPCell cell3 = new PdfPCell(new Phrase("Qty", FontFactory.getFont(FontFactory.HELVETICA_BOLD)));
            PdfPCell cell4 = new PdfPCell(new Phrase("Amount", FontFactory.getFont(FontFactory.HELVETICA_BOLD)));
            
            table.addCell(cell1);
            table.addCell(cell2);
            table.addCell(cell3);
            table.addCell(cell4);

            if (bill.getItems() != null && !bill.getItems().isEmpty()) {
                for (BillItem item : bill.getItems()) {
                    table.addCell(item.getCategory() != null ? item.getCategory() : "Misc");
                    table.addCell(item.getDescription() != null ? item.getDescription() : "");
                    table.addCell(String.valueOf(item.getQuantity() != null ? item.getQuantity() : 1));
                    table.addCell(String.valueOf(item.getTotalAmount()));
                }
            } else {
                PdfPCell empty = new PdfPCell(new Phrase("No detailed items recorded."));
                empty.setColspan(4);
                table.addCell(empty);
            }
            document.add(table);
            
            document.add(new Paragraph(" "));
            
            // Totals
            Font boldFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            document.add(new Paragraph("Subtotal: INR " + bill.getTotalAmount()));
            document.add(new Paragraph("Discount: INR " + bill.getDiscount()));
            document.add(new Paragraph("Net Amount: INR " + bill.getNetAmount(), boldFont));
            document.add(new Paragraph("Amount Paid: INR " + bill.getAmountPaid()));
            document.add(new Paragraph("Outstanding: INR " + bill.getOutstanding(), boldFont));

            document.close();
            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error generating PDF invoice", e);
        }
    }
}
