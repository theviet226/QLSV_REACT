import React, { Component } from 'react'
import { connect } from 'react-redux';
import { hoanThienChinhSuaCreator,themSinhVienCreator,timKiemThongTinCreator } from '../../../../redux/QLSV/QuanLySinhVien.action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MAPPER = {
  maSV: "Mã sinh viên",
  hoTen: "Họ và tên",
  sdt: "Số điện thoại",
  email: "Email"
}
class FormDangKy extends Component {
  state = {
    value: {
      maSV: "",
      hoTen: "",
      sdt: "",
      email: "",
    },
    touch: {
      maSV: false,
      hoTen: false,
      sdt: false,
      email: false,
    },
    error: {
      maSV: "",
      hoTen: "",
      sdt: "",
      email: "",
    },
    searchText: "",
  };

  hanldeChange = (event) => {
    const { id,value,  } = event.target
    let newError = {}
    for (const key in this.state.touch) {
      if (this.state.touch[key]) {
        const __value = key == id ? value : this.state.value[key]
        
        switch (key) {
          case "id": {
            if (/^\d*$/.test(___value) === false) {
              newError[key] = "Id phải là số.";
            }
            break;
          }
          case "email": {
            if (/[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/.test(__value) === false) {
              newError[key] = "Email không hợp lệ"
            }
            break
          }
          case "sdt": {
            if (/(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(__value) === false) {
              newError[key] = "Số điện thoại không hợp lệ"
            }
          }
          default: {
            break
          }
        }
        if (__value.length === 0) {
          newError[key] = MAPPER[key] + " không được bỏ trống"
        }
      }
    }

    if (id === "txtSearch") {
      this.setState({
        searchText: value,
      });
      this.props.dispatch(timKiemThongTinCreator(value.toLowerCase().trim()));
    } else {
      this.setState({
        value: {
          ...this.state.value,
          [id]: value,
        },
        error: newError,
      });
    }
  }
  hanldeFocus = (event) => {
    const { id } = event.target
    this.setState({
      touch: {
        ...this.state.touch,
        [id]: true
      }
    })
  }
  hanldeSubmit = (event) => {
    event.preventDefault()
    for (const key in this.state.value) {
      if (this.state.value[key].length === 0) {
        return
      }
      if (this.state.error[key]?.length > 0) {
        return
      }
    }


    const creator = this.props.svChinhSua ? hoanThienChinhSuaCreator : themSinhVienCreator
    console.log("submit", this.state.value)
    this.props.dispatch(creator(this.state.value))
    this.setState({
      value: {
        maSV: "",
        hoTen: "",
        sdt: "",
        email: "",
      }
    });
    const actionMessage = this.props.svChinhSua ? "chỉnh sửa" : "thêm";
    toast.success(`Đã ${actionMessage} sinh viên thành công!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });
  }
  static getDerivedStateFromProps(newProps, currentState) {
    console.log({ newProps, currentState });
    if (newProps.svChinhSua && newProps.svChinhSua.maSV !== currentState.value.maSV) {
    return {
      ...currentState,
      value: newProps.svChinhSua
    };
  }
    if (newProps.mangTimKiem !== currentState.mangTimKiem) {
      return {
        ...currentState,
        mangTimKiem: newProps.mangTimKiem
      };
    }
    return null
  }





  render() {
    
    return (
      <form onSubmit={this.hanldeSubmit} className='g-3'>
        <div className='row'>
          <div className='col-6'>
            <div>
              <label htmlFor="maSV">Mã SV</label>
              <input
                onFocus={this.hanldeFocus}
                value={this.state.value?.maSV}
                onChange={this.hanldeChange}
                type="text"
                className="form-control"
                id="maSV"
                name="MaSV"
                placeholder="" />
              {
                this.state.touch?.maSV && this.state.error?.maSV && (
                  <p className='text-red-600'>{this.state.error?.maSV}</p>
                )
              }

            </div>
            <div>
              <label htmlFor="sdt">Số điện thoại</label>
              <input
                onFocus={this.hanldeFocus}
                value={this.state.value?.sdt}
                onChange={this.hanldeChange}
                type="text"
                className="form-control"
                id="sdt"
                name="sdt"
                placeholder="" />
              {
                this.state.touch?.sdt && this.state.error?.sdt && (
                  <p className='text-red-600'>{this.state.error?.sdt}</p>
                )
              }
            </div>
          </div>
          <div className='col-6'>
            <div>
              <label htmlFor="ten">Họ Tên</label>
              <input
                onFocus={this.hanldeFocus}
                value={this.state.value?.hoTen}
                onChange={this.hanldeChange}
                type="text"
                className="form-control"
                id="hoTen"
                name="hoTen"
                placeholder="" />
              {
                this.state.touch?.hoTen && this.state.error?.hoTen && (
                  <p className='text-red-600'>{this.state.error?.hoTen}</p>
                )
              }
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                onFocus={this.hanldeFocus}
                value={this.state.value?.email}
                onChange={this.hanldeChange}
                type="text"
                className="form-control"
                id="email"
                name="email"
                placeholder="" />
              {
                this.state.touch?.email && this.state.error?.email && (
                  <p className='text-red-600'>{this.state.error?.email}</p>
                )
              }
            </div>
          </div>
        </div>
        <div className='mt-4'>
          {this.props.svChinhSua ? (<button className='btn btn-warning mx-4'>Chỉnh Sửa</button>) : (<button className='btn btn-success'>Thêm sinh viên</button>)}


        </div>
        <div>
          <div className="row mt-4">
            <div className="form-group">
              <input
                placeholder="Nhập tên sinh viên"
                type="text"
                className="form-control"
                id="txtSearch"
                value={this.state.searchText}
                onChange={this.hanldeChange}
              />
            </div>
          </div>
        </div>
        <ToastContainer />

      </form>
    )
  }
}
const mapStateToProps = (rootReducer) => {
  return {
    svChinhSua: rootReducer.quanLySinhVienReducer.svChinhSua,
    mangTimKiem: rootReducer.quanLySinhVienReducer.mangTimKiem

  }
}

export default connect(mapStateToProps)(FormDangKy)