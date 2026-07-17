import React, { useState, useMemo, useCallback, memo, useEffect } from 'react';
// jsPDF and html2canvas will be loaded lazily in generatePdf
import logo from '../assets/logo.png';
import './InvoiceGenerator.css';

const InvoiceGenerator = () => {
  // Predefined services/designs with prices (in LKR)
  const SERVICE_OPTIONS = [
    { id: 1, name: 'Logo Design', price: 5000 },
    { id: 2, name: 'Website Development', price: 25000 },
    { id: 3, name: 'Brand Identity Package', price: 15000 },
    { id: 4, name: 'Social Media Graphics', price: 8000 },
    { id: 5, name: 'UI/UX Design', price: 20000 },
  ];
  const [items, setItems] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [totalState, setTotalState] = useState({ subtotal: 0, tax: 0, total: 0 });
  const [email, setEmail] = useState('');
  const [pdfBlob, setPdfBlob] = useState(null);
  const [client, setClient] = useState({ name: '', address: '' });
  const [invoiceInfo, setInvoiceInfo] = useState({ number: '', date: new Date().toISOString().split('T')[0] });

  const handleItemChange = useCallback((index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = field === 'description' ? value : Number(value);
    setItems(newItems);
  }, [items]);

  const addItem = useCallback(() => setItems([...items, { description: '', qty: 1, price: 0 }]), [items]);
  // Add a predefined service/design as a line item
  const addPredefinedItem = useCallback((svc) => {
    setItems([...items, { description: svc.name, qty: 1, price: svc.price }]);
  }, [items]);
  const removeItem = useCallback((index) => setItems(items.filter((_, i) => i !== index)), [items]);

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.qty * i.price, 0), [items]);
  const taxRate = 0; // placeholder, can be adjusted later
  const tax = useMemo(() => subtotal * taxRate, [subtotal, taxRate]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  const generatePdf = async () => {
  const [{ default: html2canvas }, { default: jspdf }] = await Promise.all([
    import('html2canvas'),
    import('jspdf')
  ]);
  const invoiceElement = document.getElementById('invoice');
  if (!invoiceElement) {
    console.error('Invoice element not found');
    return;
  }
  const canvas = await html2canvas(invoiceElement, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jspdf.jsPDF('p', 'pt', 'a4');
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  const blob = pdf.output('blob');
  setPdfBlob(blob);
  setPreviewVisible(true);
  pdf.save(`invoice_${invoiceInfo.number || 'new'}.pdf`);
};

  const sendEmail = () => {
    console.log('Sending email to', email, 'with blob', pdfBlob);
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Generate Invoice</h2>
        <div className="invoice-form">
          <div className="form-group">
            <label>Client Name</label>
            <input type="text" value={client.name} onChange={e => setClient({ ...client, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Client Address</label>
            <input type="text" value={client.address} onChange={e => setClient({ ...client, address: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Select Service / Design</label>
            <select id="service-select" className="form-input">
              <option value="">-- Choose --</option>
              {SERVICE_OPTIONS.map(svc => (
                <option key={svc.id} value={svc.id}>{svc.name} (Rs. {svc.price})</option>
              ))}
            </select>
            <button className="btn btn-outline" style={{ marginTop: '0.5rem' }}
              onClick={() => {
                const sel = document.getElementById('service-select');
                const id = parseInt(sel.value);
                if (!isNaN(id)) {
                  const svc = SERVICE_OPTIONS.find(s => s.id === id);
                  if (svc) addPredefinedItem(svc);
                  sel.value = '';
                }
              }}>Add Service</button>
          </div>
          <div className="form-group">
            <label>Invoice Number</label>
            <input type="text" value={invoiceInfo.number} onChange={e => setInvoiceInfo({ ...invoiceInfo, number: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" value={invoiceInfo.date} onChange={e => setInvoiceInfo({ ...invoiceInfo, date: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Email (to send invoice)</label>
            <input
              type="email"
              placeholder="customer@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button type="button" onClick={generatePdf}>Generate PDF</button>
            {pdfBlob && (
              <button type="button" onClick={sendEmail}>Send Email</button>
            )}
          </div>
        </div>
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <input type="text" value={item.description} onChange={e => handleItemChange(idx, 'description', e.target.value)} />
                </td>
                <td>
                  <input type="number" min="1" value={item.qty} onChange={e => handleItemChange(idx, 'qty', e.target.value)} />
                </td>
                <td>
                  <input type="number" min="0" step="0.01" value={item.price} onChange={e => handleItemChange(idx, 'price', e.target.value)} />
                </td>
                <td>{(item.qty * item.price).toFixed(2)}</td>
                <td>
                  <button onClick={() => removeItem(idx)}>✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary" onClick={addItem}>Add Item</button>
        <div className="invoice-summary">
          <p>Subtotal: {subtotal.toFixed(2)}</p>
          <p>Tax: {tax.toFixed(2)}</p>
          <p><strong>Total: {total.toFixed(2)}</strong></p>
        </div>
        
        {previewVisible && (
        <div id="invoice" className="invoice-preview">
          <div className="invoice-header" style={{
            background: 'linear-gradient(135deg, #1a0533 0%, #3b0083 60%, #6b00cc 100%)',
            borderRadius: '12px 12px 0 0',
            padding: '24px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <img src={logo} alt="Muxx Digital Logo" className="invoice-logo" style={{
              height: '60px',
              objectFit: 'contain',
              filter: 'brightness(1)',
            }} />
            <div className="invoice-details" style={{ textAlign: 'right', color: '#fff' }}>
              <p style={{ margin: '2px 0', fontSize: '13px', opacity: 0.85 }}>Phone: +94 70 185 4881</p>
              <p style={{ margin: '2px 0', fontSize: '13px', opacity: 0.85 }}>Email: info@muxxdigital.com</p>
            </div>
          </div>
          <div className="invoice-meta">
            <div>
              <p><strong>Bill To:</strong></p>
              <p>{client.name}</p>
              <p>{client.address}</p>
            </div>
            <div>
              <p>Invoice #: {invoiceInfo.number}</p>
              <p>Date: {invoiceInfo.date}</p>
            </div>
          </div>
          <table className="invoice-table preview-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.description}</td>
                  <td>{item.qty}</td>
                  <td>{item.price.toFixed(2)}</td>
                  <td>{(item.qty * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="invoice-summary preview-summary">
            <p>Subtotal: {subtotal.toFixed(2)}</p>
            <p>Tax: {tax.toFixed(2)}</p>
            <p><strong>Total: {total.toFixed(2)}</strong></p>
          </div>
        </div>
        )}
      </div>
    </section>
  );
};

export default memo(InvoiceGenerator);
