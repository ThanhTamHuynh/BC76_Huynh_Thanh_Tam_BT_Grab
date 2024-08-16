// 25(1)8000 (18)7500(6)7000
// 6p - 3p =3p 2000
// 12p - 3p = 3 * 2000
const GRAB_CAR = "grabCar";
const GRAB_SUV = "grabSUV";
const GRAB_BLACK = "grabBlack";
// NV1: Thực hiện tạo 1 sự kiện click cho nút button tính tiền và dom tới các input để lấy dữ liệu
// NV2: Viết 4 function riêng biệt có nhận tham số để từ các dữ liệu ng dùng nhập sẽ xử lí trả về giá KmDauTien, gía KmTu1Den19 và giá KmTu19TroLen và giá thoiGianCho
// NV3: Sau khi đã tìm được các giá tiền phù hợp, áp dụng tính toán và trả về kết quả phù hợp nhất
// NV4: Kiểm tra ở phần dưới button tính tiền có một layout dùng để hiển thị tổng tiền, xử lí khi click vô nút tính tiền sẽ xuất hiện layout đó và trả kết quả (đã chuyển đổi kiểu tiền tệ) vào bên trong đẻ hiển thị ng dùng

function giaKmDauTien(loaiXe) {
  switch (loaiXe) {
    case GRAB_CAR: {
      return 8000;
    }
    case GRAB_SUV: {
      return 9000;
    }
    case GRAB_BLACK: {
      return 10000;
    }
  }
}
function giaKmTU1Den19(loaiXe) {
  switch (loaiXe) {
    case GRAB_CAR: {
      return 7500;
    }
    case GRAB_SUV: {
      return 8500;
    }
    case GRAB_BLACK: {
      return 950
    }
  }
}
function giaKmTU19TroLen(loaiXe) {
  switch (loaiXe) {
    case GRAB_CAR: {
      return 7000;
    }
    case GRAB_SUV: {
      return 8000;
    }
    case GRAB_BLACK: {
      return 9000;
    }
  }
}
function giaThoiGianCho(loaiXe) {
  switch (loaiXe) {
    case GRAB_CAR: {
      return 2000;
    }
    case GRAB_SUV: {
      return 3000;
    }
    case GRAB_BLACK: {
      return 3500;
    }
  }
}
document.getElementById("btnTinhTien").onclick = function () {
  let soKM = document.getElementById("txt-km").value * 1;
  let thoiGianCho = document.getElementById("txt-thoiGianCho").value * 1;
  let loaiXeGrabCar = document.querySelector("input[name='selector']:checked");
  if (loaiXeGrabCar == null) {
    alert("Vui lòng chọn loại xe");
    return;
  }
  let loaiXe = loaiXeGrabCar.value;
  console.log(loaiXe);
  let tienKmDauTien = giaKmDauTien(loaiXe);
  let tienKmTu1Den19 = giaKmTU1Den19(loaiXe);
  let tienKmTu19TroLen = giaKmTU19TroLen(loaiXe);
  let tienTgCho = giaThoiGianCho(loaiXe);
  let tongTien = 0;
  if (soKM <= 19) {
    tongTien = 1 * tienKmDauTien + (soKM - 1) * tienKmTu1Den19;
  } else {
    // 25 = 1 + 18
    tongTien =
      1 * tienKmDauTien + 18 * tienKmTu1Den19 + (soKM - 19) * tienKmTu19TroLen;
  }
  // 8p - 3p= 5p /3
  let soLanPhat = Math.floor((thoiGianCho - 3) / 3); // Math.floor làm tròn xuống
  tongTien += soLanPhat * tienTgCho;
  let result = tongTien.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  // console.log(tongTien);
  document.querySelector(".dongia").style.display = "block";
  document.getElementById("xuatTien").innerHTML = `${result}`;
};

//  Tạo 1 chức năng click cho nút hóa đơn
document.getElementById("btnInHoaDon").onclick = function () {
  // input 
  let soKM = document.getElementById("txt-km").value * 1;
  let thoiGianCho = document.getElementById("txt-thoiGianCho").value * 1;
  let loaiXeGrabCar = document.querySelector("input[name='selector']:checked");
  if (loaiXeGrabCar == null) {
    alert("Vui lòng chọn loại xe");
    return;
  }
  let loaiXe = loaiXeGrabCar.value; 
  // xu ly  
  let soKmDauTien =0;
  let soKmTu1Den19 = 0;
  let soKmTren19 = 0;
  if(soKM <= 19){
    if(soKM <=1){
      soKmDauTien = soKM;
      soKmTu1Den19 = 0;
      soKmTren19 = 0;
    }else{
      soKmDauTien = 1;
      soKmTu1Den19 = soKM -1;
      soKmTren19 = 0;
    }
  }else{
    soKmDauTien = 1;
    soKmTu1Den19 = 18;
    soKmTren19 = soKM -19;
  }
  let lanPhat = 0;
  if(thoiGianCho <= 3){
    lanPhat = 0;
  }else {
    lanPhat = Math.floor((thoiGianCho - 3) / 3)
  }
  let thoiGianCho3phut = 0;
  if(thoiGianCho <=0){
    thoiGianCho3phut = 0;
  }else{
    thoiGianCho3phut = thoiGianCho -3;
  }
  let hoaDonDauTien = giaKmDauTien(loaiXe)
  let hoaDonTu1Den19 = giaKmTU1Den19(loaiXe)
  let hoaDonTren19 =giaKmTU19TroLen(loaiXe);
  let hoaDonTgCho = giaThoiGianCho(loaiXe)
  let tongTien1 = soKmDauTien * hoaDonDauTien;
  let tongTien2 = soKmTu1Den19 * hoaDonTu1Den19;
  let tongTien3 = soKmTren19 * hoaDonTren19;
  let tongTien4 = lanPhat * hoaDonTgCho;
  let result = tongTien1 + tongTien2 + tongTien3 + tongTien4;
  $("#exampleModal").modal("show");
  document.querySelector(".modal-body").innerHTML = `
  <table class="table">
  <thead>
    <tr>
      <th colspan="2">Loại xe</th>
      <th>${loaiXe}</th>
      <th>Số km: ${soKM}</th>
    </tr>
  </thead>
  <tbody>
  <tr>
      <td scope="col">CHI TIẾT</td>
      <td scope="col">SỬ DỤNG</td>
      <td scope="col">ĐƠN GIÁ (1000đ)</td>
      <td scope="col">THÀNH TIỀN(1000đ)</td>
    </tr>
    <tr>
      <th scope="row">KM ĐẦU TIÊN</th>
      <td>${soKmDauTien}</td>
      <td>${hoaDonDauTien.toLocaleString("vi", {
        style: "currency",
        currency: "VND",
      })}</td>
      <td>${tongTien1.toLocaleString("vi", {
        style: "currency",
        currency: "VND",
      })}</td>
    </tr>
    <tr>
      <th scope="row">Từ 1 đến 19</</th>
      <td>${soKmTu1Den19}</td>
      <td>${hoaDonTu1Den19.toLocaleString("vi", {
        style: "currency",
        currency: "VND",
      })}</td>
      <td>${tongTien2.toLocaleString("vi", {
        style: "currency",
        currency: "VND",
      })}</td>
    </tr>
    <tr>
      <th scope="row">Từ 19 trở lên</</th>
      <td>${soKmTren19}</td>
      <td>${hoaDonTren19.toLocaleString("vi", {
        style: "currency",
        currency: "VND",
      })}</td>
      <td>${tongTien3.toLocaleString("vi", {
        style: "currency",
        currency: "VND",
      })}</td>
    </tr>
    <tr>
      <th scope="row">Thời gian chờ 3 phút đầu free</th>
      <td>${thoiGianCho}</td>
      <td>${hoaDonTgCho.toLocaleString("vi", {
        style: "currency",
        currency: "VND",
      })}</td>
      <td>${tongTien4.toLocaleString("vi", {
        style: "currency",
        currency: "VND",
      })}</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th colspan="4" class="text-right">Tổng tiền: ${result.toLocaleString(
        "vi-VN",
        { style: "currency", currency: "VND" }
      )}</th>
    </tr>
  </tfoot>
</table>
  `;
};
