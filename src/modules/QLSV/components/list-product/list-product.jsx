import React, { Component } from 'react'
import { connect } from 'react-redux'
import { chinhSuaThongTinCreator,xoaSinhVienCreator } from '../../../../redux/QLSV/QuanLySinhVien.action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class ListProduct extends Component {
  handleXoaSinhVien = (maSV) => {
    if (window.confirm('Bạn có muốn xóa sinh viên này?')) {
      this.props.dispatch(xoaSinhVienCreator({ maSV }));


      toast.success("Đã xoá sinh viên thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    }
  };
  

  render() {
    const { mangSinhVien, mangTimKiem } = this.props;
    const danhSachHienThi = mangTimKiem.length > 0 ? mangTimKiem : mangSinhVien;
    return (
      <div>
        <table className='table mt-10'>
          <thead >
            <tr className='table-dark text-white text-center'>
              <th scope='col'>Mã SV</th>
              <th scope='col'>Họ Tên</th>
              <th scope='col'>Số điện thoại</th>
              <th scope='col'>Email</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {danhSachHienThi.map((sv) => {
              return (
                <tr key={sv.maSV} className='text-center' >
                  <th scope='row'>{sv.maSV}</th>
                  <td>{sv.hoTen}</td>
                  <td>{sv.sdt}</td>
                  <td>{sv.email}</td>
                  <td>
                  <button className='btn btn-danger' onClick={() => this.handleXoaSinhVien(sv.maSV)}>
                      <i class="fa-solid fa-trash"></i>
                    </button>
                    <button className='btn btn-warning mx-2' onClick={() => { this.props.dispatch(chinhSuaThongTinCreator(sv)) }}><i class="fa-solid fa-pen-to-square"></i></button>
                  </td>

                </tr>)

            })}

          </tbody>

        </table>
        <ToastContainer />
      </div>
    )
  }
  componentWillUnmount() {

  }
}

const mapStateToProps = (rootReducer) => {
  return {
    mangSinhVien: rootReducer.quanLySinhVienReducer.mangSinhVien,
    mangTimKiem :rootReducer.quanLySinhVienReducer.mangTimKiem ,
  }
}
export default connect(mapStateToProps)(ListProduct)