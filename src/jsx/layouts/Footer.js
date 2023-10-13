import React from "react";

const Footer = () => {
	var d = new Date();
	return (
		<div className="footer out-footer">
			<div className="copyright">
				<p>Copyright © 
					
					{" "}Desarrollado por{" Sexto Semestre Meso Xela "}
					<a href="http://dexignzone.com/" target="_blank"  rel="noreferrer">
						DexignZone
					</a>{" "}
					{d.getFullYear()}
				</p>
			</div>
		</div>
	);
};

export default Footer;
