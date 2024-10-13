package ollamasvc

import (
	"fmt"
	"testing"
)

func TestSavxxe(t *testing.T) {

	// postgresqldb.Init()

	llama := NewLlama3()
	llama.SetModel("llama3:8b")
	llama.SetSystem("Please simplify the following text for better readability without adding any extra introduction or explanation.")
	resp, err := llama.Request("🚀 ร่วมสร้างอนาคตกับเรา! 🚀**ตำแหน่ง: Fullstack Developer (React & JavaScript) **คุณคือ.. นักพัฒนาไฟแรง 🔥 ที่พร้อมลุยงานท้าทาย 💪 และหลงใหลในการสร้างสรรค์แอปพลิเคชันสุดล้ำ 🚀 ที่พร้อมจะ revolutionize โลก 🌎เรากำลังมองหา.. Fullstack Developer สุดเจ๋ง 😎 มาร่วมทีมพัฒนาสุดมันส์ 🎉 เพื่อสร้างสรรค์ ระบบจัดการและธรรมาภิบาลข้อมูลขนาดใหญ่ และระบบ Software ต่าง ๆ สุด innovative และท้าทายที่จะเปลี่ยนแปลงให้ชีวิตของผู้คนและวิถีการทำงานให้ดีขึ้นภารกิจสุดท้าทาย..ออกแบบและพัฒนาแอปพลิเคชัน web สุดล้ำ ด้วย React และ JavaScriptร่วมสร้างสรรค์ Backend สุดแข็งแกร่งสร้าง API สุดเจ๋ง เพื่อเชื่อมต่อระบบต่างๆร่วมกัน brainstorm ไอเดียสุดบรรเจิด และ troubleshoot ปัญหาสุดหินเรียนรู้เทคโนโลยีใหม่ๆ อยู่เสมอ และ sharpen skills ให้คมกริบคุณสมบัติสุดเจ๋ง..ประสบการณ์การพัฒนา Fullstack ด้วย React และ JavaScriptความเชี่ยวชาญใน HTML, CSS, และ JavaScript frameworksความเข้าใจใน RESTful APIsความเข้าใจใน Database และ SQLPassion ในการพัฒนา และ problem-solving skills สุดเทพทักษะการทำงานเป็นทีม และ communication skills สุดปังความกระหายในการเรียนรู้ และ growth mindsetTechnology ที่เราใช้และโอกาสที่จะได้เรียนรู้..JavaScript/TypeScript/Node.jsExpress.js/Nest.jsGraphQL/DirectusGithub/CI/CDCloudera Big Data Platform (Hadoop-based)Qlik and Talend Data Management & Analytics PlatformQlikSense/Tableau/PowerBIDatabases such as MongoDB, PostgreSQL, MSSQL, MySQL etc.สิทธิประโยชน์สุดพิเศษ..โอกาสในการเติบโตในสายอาชีพ และ learn จากทีม expertsบรรยากาศการทำงานสุด fun และ casualเงินเดือน และ benefits สุดคุ้ม (Medical insurance, Performance bonus, A Computer Notebook, Parties & Travels, T-Shirts, Free snacks :)โอกาสในการสร้าง impact ให้กับผู้คน และ make a difference ในโลกมาร่วมเป็นส่วนหนึ่งของทีมสุดเจ๋ง และ build อนาคตไปด้วยกัน!")
	if err != nil {
		fmt.Println("Error: ", err)
	}
	fmt.Println("Return Name: ", resp)
}
