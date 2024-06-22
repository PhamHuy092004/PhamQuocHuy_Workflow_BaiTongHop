$(document).ready(function () {
    $.ajax({
        url: 'List.html',
        type: 'GET',
        dataType: 'html', 
        success: function (newContent) {
            $('#content-container').html(newContent);
        },
        error: function (xhr) {
            console.error('Lỗi khi lấy dữ liệu HTML:', xhr);
        }
    });
});
angular.module('myApp', [])
    .controller('myCtrl', function ($scope) {
    })
    .filter('passwordValidator', function () {
        return function (input) {
            var rex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            return rex.test(input) ? input : '';
        };
    })
    .directive('matchPassword', function () {
        return {
            require: 'ngModel',
            scope: {
                otherModelValue: '=matchPassword'
            },
            link: function (scope, element, attributes, ngModel) {
                ngModel.$validators.match = function (modelValue) {
                    return modelValue === scope.otherModelValue;
                };
                scope.$watch('otherModelValue', function () {
                    ngModel.$validate();
                });
            }
        };
    })
    .filter('phoneNumberValidator', function () {
        return function (input) {
            // Kiểm tra số điện thoại Việt Nam
            if (/^(0[139785])\d{8}$/.test(input)) {
                return input;
            } else {
                return '';
            }
        };
    })
    .directive('userForm', function () {
        return {
            restrict: 'E',
            template: `
  <div class="card">
                        <div class="card-header">
                            <P class="fw-bolder">Đăng ký tài khoản</P>
                        </div>
                        <div class="card-body">
                            <form name="profileForm" ng-submit="addUser()">
                                <div class="col-lg-12 mb-3">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" name="fullName" required ng-model="fullName" id="focus_click" placeholder="Nhập tên họ và tên">
                                        <label>Họ và tên</label>
                                        <div class="text-danger" ng-show="profileForm.fullName.$error.required && profileForm.fullName.$touched">
                                            Họ và tên là bắt buộc.
                                        </div>
                                    </div>
                                </div>
                                   <div class="col-lg-12 mb-3">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" name="phoneNumber" required ng-model="phoneNumber" id="focus_click" placeholder="Nhập tên họ và tên">
                                        <label>Số điện thoại</label>
                                        <div class="text-danger" ng-show="profileForm.phoneNumber.$error.required && profileForm.phoneNumber.$touched">
                                            Số diên thoại là bắt buộc.
                                        </div>
                                           <div ng-show="phoneNumber && !(phoneNumber | phoneNumberValidator)">
                                                <small class="text-danger">Số điện thoại không hợp lệ. Vui lòng nhập đúng 10 chữ số.</small>
                                            </div>
                                    </div>
                                </div>
                                <div class="col-lg-12 mb-3">
                                    <div class="form-floating">
                                        <input type="date" class="form-control" id="focus_click" name="birthdate" ng-model="birthdate" required>
                                        <label>Ngày sinh</label>
                                        <div class="text-danger" ng-show="profileForm.birthdate.$error.required && profileForm.birthdate.$touched">
                                            Năm sinh là bắt buộc.
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12 mb-3">
                                    <div class="form-floating">
                                        <select class="form-select" name="gender" required ng-model="gender">
                                            <option value="">Chọn giới tính</option>
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                        </select>
                                        <label>Giới tính</label>
                                        <div class="text-danger" ng-show="profileForm.gender.$error.required && profileForm.gender.$touched">
                                           Giới tính là bắt buộc.
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label class="col-form-label col-lg-3">Chọn tỉnh thành</label>
                                    <div class="col-lg-9">
                                        <select class="form-control select" name="province_city" ng-model="province_city" required>
                                            <optgroup label="Tỉnh thành Việt Nam">
                                                <option value="AN">An Giang</option>
                                                <option value="BV">Bà Rịa - Vũng Tàu</option>
                                                <option value="BK">Bắc Kạn</option>
                                                <option value="BG">Bắc Giang</option>
                                                <option value="BL">Bạc Liêu</option>
                                                <option value="BN">Bắc Ninh</option>
                                                <option value="BT">Bến Tre</option>
                                                <option value="BD">Bình Dương</option>
                                                <option value="BP">Bình Phước</option>
                                                <option value="BTH">Bình Thuận</option>
                                                <option value="BĐ">Bình Định</option>
                                                <option value="CM">Cà Mau</option>
                                                <option value="CB">Cao Bằng</option>
                                                <option value="CT">Cần Thơ</option>
                                                <option value="ĐB">Điện Biên</option>
                                                <option value="ĐL">Đắk Lắk</option>
                                                <option value="ĐN">Đắk Nông</option>
                                                <option value="ĐNG">Đà Nẵng</option>
                                                <option value="ĐN">Đồng Nai</option>
                                                <option value="ĐT">Đồng Tháp</option>
                                                <option value="GL">Gia Lai</option>
                                                <option value="HG">Hà Giang</option>
                                                <option value="HNA">Hà Nam</option>
                                                <option value="HNO">Hà Nội</option>
                                                <option value="HT">Hà Tĩnh</option>
                                                <option value="HD">Hải Dương</option>
                                                <option value="HP">Hải Phòng</option>
                                                <option value="HG">Hậu Giang</option>
                                                <option value="HB">Hòa Bình</option>
                                                <option value="HY">Hưng Yên</option>
                                                <option value="KH">Khánh Hòa</option>
                                                <option value="KG">Kiên Giang</option>
                                                <option value="KT">Kon Tum</option>
                                                <option value="LC">Lai Châu</option>
                                                <option value="LD">Lâm Đồng</option>
                                                <option value="LS">Lạng Sơn</option>
                                                <option value="LCH">Lào Cai</option>
                                                <option value="LA">Long An</option>
                                                <option value="NB">Nam Định</option>
                                                <option value="NA">Nghệ An</option>
                                                <option value="NB">Ninh Bình</option>
                                                <option value="NT">Ninh Thuận</option>
                                                <option value="PT">Phú Thọ</option>
                                                <option value="PY">Phú Yên</option>
                                                <option value="QB">Quảng Bình</option>
                                                <option value="QNA">Quảng Nam</option>
                                                <option value="QNG">Quảng Ngãi</option>
                                                <option value="QN">Quảng Ninh</option>
                                                <option value="QT">Quảng Trị</option>
                                                <option value="ST">Sóc Trăng</option>
                                                <option value="SL">Sơn La</option>
                                                <option value="TQ">Tây Ninh</option>
                                                <option value="TN">Thái Nguyên</option>
                                                <option value="TB">Thái Bình</option>
                                                <option value="TTH">Thừa Thiên Huế</option>
                                                <option value="TG">Tiền Giang</option>
                                                <option value="TV">Trà Vinh</option>
                                                <option value="TQ">Tuyên Quang</option>
                                                <option value="VL">Vĩnh Long</option>
                                                <option value="VP">Vĩnh Phúc</option>
                                                <option value="YB">Yên Bái</option>
                                                <option value="TPHCM">Thành phố Hồ Chí Minh</option>
                                            </optgroup>
                                        </select>
                                    </div>
                                    <div class="text-danger" ng-show="profileForm.province_city.$error.required && profileForm.province_city.$touched">
                                        Tỉnh thành là bắt buộc.
                                    </div>
                                </div>
                                <div class="col-lg-12 mb-3">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" name="username" ng-model="username" required id="focus_click" placeholder="Nhập tên tài khoản">
                                        <label>Tên tài khoản</label>
                                        <div class="text-danger" ng-show="profileForm.username.$error.required && profileForm.username.$touched">
                                           Tên tài khoản là bắt buộc.
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12 mb-3">
                                    <div class="form-floating">
                                        <input type="password" class="form-control" name="password" ng-model="password" required id="focus_click" placeholder="Nhập mật khẩu">
                                        <label for="focus_click">Mật khẩu</label>
                                        <div class="text-danger" ng-show="profileForm.password.$error.required && profileForm.password.$touched">
                                            Mật khẩu là bắt buộc.
                                        </div>
                                        <div class="text-danger" ng-show="password && !(password | passwordValidator)">
                                            Mật khẩu phải có chứa ít nhất 1 ký tự thường, 1 ký tự số, 1 ký tự đặt biệt và ít nhất 8 ký tự.
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12 mb-3">
                                    <div class="form-floating">
                                        <input type="password" class="form-control" name="repass" ng-model="repass" required match-password="password" placeholder="Nhập lại mật khẩu">
                                        <label for="focus_click">Xác nhận mật khẩu</label>
                                        <div class="text-danger" ng-show="profileForm.repass.$error.required && profileForm.repass.$touched">
                                            Mật khẩu xác nhận là bắt buộc.
                                        </div>
                                        <div class="text-danger" ng-show="profileForm.repass.$error.match && profileForm.repass.$touched">
                                            Mật khẩu xác nhận không khớp.
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <button type="reset" class="btn btn-light">Hủy thông tin</button>
                                    <button type="submit" class="btn btn-primary" ng-disabled="profileForm.$invalid">Đăng ký tài khoản <i class="ph-paper-plane-tilt ms-2"></i></button>
                                </div>
                            </form>
                        </div>
                    </div>
        `,
            controller: function ($scope, $http, $window) {
                $scope.fullName = '';
                $scope.phoneNumber = '';
                $scope.birthdate = '';
                $scope.gender = '';
                $scope.province_city = '';
                $scope.username = '';
                $scope.password = '';
                $scope.repass = '';
                $scope.addUser = function () {
                    var newUser = {
                        fullName: $scope.fullName,
                        phoneNumber: $scope.phoneNumber,
                        birthDate: new Date($scope.birthdate),
                        gender: $scope.gender,
                        province: $scope.province_city,
                        username: $scope.username,
                        password: $scope.password
                    };
                    $http({
                        method: 'POST',
                        url: '/Home/AddUser', 
                        data: newUser
                    }).then(function (response) {
                        if (response.data.success) {
                            $http({
                                method: 'GET',
                                url: '/Home/GetUsers' 
                            }).then(function (response) {
                                $window.location.href = '/Home/Index';
                                console.log('Thêm người dùng thành công.');
                            }, function (error) {
                                console.error('Có lỗi:', error);
                            });
                            $scope.fullName = '';
                            $scope.phoneNumber = '';
                            $scope.birthdate = '';
                            $scope.gender = '';
                            $scope.province_city = '';
                            $scope.username = '';
                            $scope.password = '';
                            $scope.repass = '';
                        } else {
                            console.error('Thất bại khi thêm:', response.data.message);
                        }
                    }, function (error) {
                        console.error('Lỗi khi thêm:', error);
                    });
                };
            }
        };
    });