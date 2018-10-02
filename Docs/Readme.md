
## EVENT API Documentation

| Endpoints | description |Request fields|
| --- | --- | ------|
| (get)/Registration/[id] |ค้นหาข้อมูลผู้ลงทะเบียน จาก ID คืนค่า 1แถวเท่านั้น | -
| (get)/Registration |ค้นหาข้อมูลผู้ลงทะเบียนที่เป็นไปได้ในฐานข้อมูล | ?=limit,  term, qr
| (post)/Registration | สร้างข้อมูลผู้ลงทะเบียน | event_id, first_name, last_name, nickname, ema9l, line_id, phone_num, company_id, company_name
| (put)/Registration/[id] | แก้ไขข้อมูลผู้ลงทะเบียน  | event_id, first_name, last_name, nickname, ema9l, line_id, phone_num, company_id, company_name
| (get)/event/[id] | ค้นหาข้อมูลกิจกรรม | 
