/*Sizning kodingizda uchta alohida modal mavjud: Modal, Modal1, va Modal2, har biri turli ma'lumotlar uchun ishlatiladi. Hozirgi holatda, siz bir jadvalda turli ma'lumotlarni ko'rsatmoqdasiz va har bir turli modalda bu ma'lumotlarni kiritish imkoniyatini taqdim etmoqdasiz. Agar bir qatorni tahrirlash yoki ma'lumot kiritish uchun bir nechta formalarni birlashtirmoqchi bo'lsangiz, quyidagi amallarni bajarishingiz mumkin:

1. Modal uchun umumiy interfeysni yaratish
Har bir modal (yoki form) uchun ma'lumotlarni alohida modallar orqali kiritish emas, balki bitta modalda kerakli maydonlarni ko'rsatish uchun shartli renderdan foydalanishingiz mumkin. Misol uchun, modalOpen, modalOpen1, va modalOpen2 holatlarini birlashtirib, faqat bir modalda barcha formalarni ko'rsatishingiz mumkin.

2. Formalarni birlashtirish
Barcha formalarni birlashtirish uchun quyidagi kodni ishlatish mumkin:

Modalni bitta komponentda birlashtirish: Siz barcha formalarni bitta Modal komponentiga joylashtirib, qaysi turdagi formani ko'rsatishni xohlayotganingizga qarab render qilishni amalga oshirasiz.

Home komponentini yangilash:*/

function Home() {
    const [modalOpen, setmodalOpen] = useState(false);
    const [formType, setFormType] = useState(null); // yangi holat form turini belgilash uchun
 
    const [rows, setrows] = useState([
      // ma'lumotlar
    ]);
 
    const [rowedit, setrowedit] = useState(null);
 
    const handlerowedit = (idx) => {
      setrowedit(idx);
      setmodalOpen(true);
      setFormType("form1"); // Hozirgi turdagi formani belgilash
    };
 
    const handlesubmit = (newrow) => {
      rowedit === null
        ? setrows([...rows, newrow])
        : setrows(
            rows.map((currew, idx) => {
              if (idx !== rowedit) return currew;
              return newrow;
            })
        );
    };
 
    return (
      <div className='home'>
        <Sidebar />
        <div className='main'>
          <Navbar />
          <div className='addandavto'>
            <div className='iconavto'>
              <span><BsTaxiFront /></span>
            </div>
            <div><span onClick={() => { setmodalOpen(true); setFormType("form1"); }}>Ertalabki</span></div>
            <div><span onClick={() => { setmodalOpen(true); setFormType("form2"); }}>Kun yakuni</span></div>
            <div><span onClick={() => { setmodalOpen(true); setFormType("form3"); }}>Zapravka</span></div>
          </div>
 
          <Table rows={rows} deleterow={handledelete} editrow={handlerowedit} />
 
          {modalOpen && (
            <Modal
              closemodal={() => setmodalOpen(false)}
              onsubmit={handlesubmit}
              defaultvalue={rowedit !== null && rows[rowedit]}
              formType={formType} // turini yuborish
            />
          )}
        </div>
      </div>
    );
  }
 
 
  /*Modalni yangilash (Bir nechta formalarni qo'shish):

  Modal.jsx komponentida formType ni ko'rib chiqib, turli formalarni ko'rsatishingiz mumkin. <Misol:*/
  
  function Modal({ closemodal, onsubmit, defaultvalue, formType }) {
  const [formstate, setformstate] = useState(defaultvalue || {});

  const handlechange = (e) => {
    setformstate({ ...formstate, [e.target.name]: e.target.value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    onsubmit(formstate);
    closemodal();
  };

  const renderForm = () => {
    switch (formType) {
      case "form1":
        return (
          <>
            <div className='form-group'>
              <label htmlFor="sana">Sana</label>
              <input type="date" name="sana" onChange={handlechange} value={formstate.sana} />
            </div>
            <div className='form-group'>
              <label htmlFor="ertalabkispid">Ertalabki spidometr ko'rsatkichi</label>
              <input type="number" name="ertalabkispid" onChange={handlechange} value={formstate.ertalabkispid} />
            </div>
            {/* boshqa maydonlar */}
            </>
        );
      case "form2":
        return (
          <>
            <div className='form-group'>
              <label htmlFor="kunyakunspid">Kun yakuni spidometr ko'rsatkichi</label>
              <input type="number" name="kunyakunspid" onChange={handlechange} value={formstate.kunyakunspid} />
            </div>
            {/* boshqa maydonlar */}
          </>
        );
      case "form3":
        return (
          <>
            <div className='form-group'>
              <label htmlFor="quyilganyoqilgi">Quyilgan yoqilgi</label>
              <input type="number" name="quyilganyoqilgi" onChange={handlechange} value={formstate.quyilganyoqilgi} />
            </div>
            {/* boshqa maydonlar */}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className='modal-container' onClick={(e) => { if (e.target.className === "modal-container") closemodal(); }}>
      <div className='modal'>
        <form onSubmit={handlesubmit}>
          {renderForm()}
          <button type="submit" className='btn'>Submit</button>
        </form>
      </div>
    </div>
  );
}

