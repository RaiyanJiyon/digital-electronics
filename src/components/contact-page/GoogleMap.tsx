const GoogleMap = () => {
    return (
      <div className="w-11/12 max-w-[1920px] mx-auto">
        <div style={{ position: "relative", paddingTop: "56.25%" /* 16:9 Aspect Ratio */ }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.865680946665!2d144.9662270742995!3d-37.816615034198364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato%20Pty%20Ltd!5e0!3m2!1sen!2sbd!4v1742451546772!5m2!1sen!2sbd"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    );
  };
  
  export default GoogleMap;
  