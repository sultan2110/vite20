function Home() {

    const [modalOpen, setmodalOpen] = useState(false);
    const [formType, setFormType] = useState(null)

    const [rows, setrows] = useState([
        {id:"1", sana:"20.02.2025", ertalabkispid:"72812", kunyakunspid:"72938", kundavomyol:"126", harajatyoqilgi:"20.034",
        ertalabkiqabulbakqoldiq:"15.044", kunyakunqoldiqbak:"35.01", quyilganyoqilgi:"40", yonalishmanzillar:"25-sonli maktab", status:"live"
    }
    ]);

    const [rowedit, setrowedit] = useState(null)

    const handlerowedit = (idx)=>{
        setrowedit(idx)
        setmodalOpen(true)
        setFormType("form1");
    }

    const handledelete = (a)=>{
        setrows(rows.filter((_, idx)=>idx !==a))
    }

    const handlesubmit = (newrow)=>{
        rowedit === null
        ? setrows([...rows, newrow])
        : setrows(
            rows.map((currew, idx)=>{
            if(idx !== rowedit) return currew
            return newrow
        })
    );
    };


  return (
  <div className='home'>
  <Sidebar/>

  <div className='main'>
      <Navbar/>
      <div className='addandavto'>
        <div className='iconavto'><span><BsTaxiFront/></span></div>
        <div><span onClick={()=>{setmodalOpen(true); setFormType("form1");}}>Ertalabki</span></div>
        <div><span onClick={()=>{setmodalOpen(true); setFormType("form2");}}>Kun yakuni</span></div>
        <div><span onClick={()=>{setmodalOpen(true); setFormType("form3");}}>zapravka</span></div>
      </div>

      
              <div className='cont'>
              <div className='container'>
              <div className='qollaw'>
              <div className='data'>
              <div>
                  <label htmlFor="">Izlash</label>
                  <input type="date"/>
              </div>
              <div>
                  <label htmlFor="">gacha</label>
                  <input type="date" />
              </div>
              </div>
              
          
          <div><span className='qollawgo'>qo'llash</span></div>
          </div>
      
      <div className='exelpdf'>
          <div><span>Exel</span></div>
          <div><span>Pdf</span></div>
      </div>

      </div>
      
      </div>
          
  <div>
      <Table rows={rows} deleterow={handledelete} editrow={handlerowedit}/>
      {modalOpen && (
      <Modal 
      closemodal={()=>setmodalOpen(false)}
      onsubmit={handlesubmit}
      defaultvalue = {rowedit !== null && rows[rowedit]}
      formType = {formType}
      />
      )}
  </div>
</div>

  }  
    
  


export default Home