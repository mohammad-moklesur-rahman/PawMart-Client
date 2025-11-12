import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";
import MyContainer from "../MyContainer";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/UseAuth";
import useAxios from "../../hooks/useAxios";
import AOS from "aos";
import "aos/dist/aos.css";
import LoadingSpinner from "../LoadingSpinner";

const SalesReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const axios = useAxios();

  // * for Aos
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  // * Get My order
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/orders/my-orders?email=${user.email}`)
      .then((res) => setSalesData(res.data))
      .finally(() => setLoading(false));
  }, [axios, user.email]);

  const downloadReport = async () => {
    const result = await Swal.fire({
      title: "Download Report?",
      text: "Do you want to download the sales report as PDF?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, download",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text("Sales Report", 14, 22);

      const head = [
        [
          "#",
          "Product",
          "Buyer",
          "Price",
          "Quantity",
          "Address",
          "Date",
          "Phone",
        ],
      ];

      // Map rows
      const body =
        salesData.length > 0
          ? salesData.map((item, index) => [
              index + 1,
              item.productName || "",
              item.buyerName || "",
              item.price !== undefined ? `$${item.price}` : "",
              item.quantity || "",
              item.address || "",
              item.date || "",
              item.phone || "",
            ])
          : [0];

      autoTable(doc, {
        startY: 30,
        head: head,
        body: body,
        theme: "grid",
        headStyles: { fillColor: [22, 160, 133], textColor: 255 },
        styles: { fontSize: 10 },
      });

      doc.save("sales-report.pdf");

      Swal.fire(
        "Downloaded!",
        "Your sales report has been downloaded.",
        "success"
      );
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-secondary pt-10 pb-20">
      <MyContainer>
        <h2
          data-aos="fade-right"
          className="text-center text-2xl text-accent font-bold"
        >
          Sales Report
        </h2>
        <div data-aos="fade-up">
          <div className="text-right mb-4">
            <button className="btn btn-primary mb-4" onClick={downloadReport}>
              Download Report (PDF)
            </button>
          </div>

          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="table w-full text-center">
              <thead className="bg-primary text-accent uppercase text-sm">
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Buyer Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Address</th>
                  <th>Date</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {salesData.length > 0 ? (
                  salesData.map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td>{index + 1}</td>
                      <td>{record.productName}</td>
                      <td>{record.buyerName}</td>
                      <td>${record.price}</td>
                      <td>{record.quantity}</td>
                      <td>{record.address}</td>
                      <td>{record.date}</td>
                      <td>{record.phone}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="p-4 text-center text-gray-500">
                      No sales Report found for your account.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default SalesReport;
