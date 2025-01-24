import "jspdf";

declare module "jspdf" {
    interface jsPDF {
        autoTable: (options: any) => jsPDF;
        previousAutoTable: { finalY: number };
    }
}
