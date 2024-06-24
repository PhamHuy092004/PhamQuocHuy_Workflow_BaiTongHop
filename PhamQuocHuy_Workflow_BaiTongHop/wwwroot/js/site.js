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
            if (!input || typeof input !== 'string') {
                return '';
            }
            input = input.replace(/\s/g, '');        
            var rex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            return rex.test(input) ? input : '';
        };
    })
    .directive('passwordValidator', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$validators.noSpaces = function (modelValue, viewValue) {
                    if (ngModel.$isEmpty(modelValue)) {
                        return true;
                    }
                    if (/\s/.test(viewValue)) {
                        return false;
                    }

                    return true;
                };
            }
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
    .directive('noSpaces', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$validators.noSpaces = function (modelValue) {
                    if (!modelValue) return true;
                    return !/\s/.test(modelValue);
                };
            }
        };
    })
    .directive('minLength', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$validators.minLength = function (modelValue) {
                    if (!modelValue) return false;
                    return modelValue.length >= 8;
                };
            }
        };
    })
    .directive('validBirthdate', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$validators.validBirthdate = function (modelValue) {
                    if (!modelValue) return true;
                    let birthdate = new Date(modelValue);
                    let today = new Date();
                    let age = today.getFullYear() - birthdate.getFullYear();
                    let monthDifference = today.getMonth() - birthdate.getMonth();

                    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdate.getDate())) {
                        age--;
                    }

                    return age >= 16 && age <= 150;
                };
            }
        };
    })
    .directive('userForm', function () {
        return {
            restrict: 'E',
            template: `
        <div class="card">
            <div class="card-header">
                <p class="fw-bolder">Đăng ký tài khoản</p>
            </div>
            <div class="card-body">
                <form name="profileForm" ng-submit="addUser()" novalidate>
                 <div class="row">
    <div class="col-lg-6 mb-3" ng-class="{ 'has-error': fullNameTouched && profileForm.fullName.$invalid }">
        <div class="form-floating">
            <input type="text" class="form-control" name="fullName" required ng-model="fullName" id="fullName" placeholder="Nhập tên họ và tên" ng-change="onInputChange('fullName')">
            <label for="fullName">Họ và tên</label>
            <div class="text-danger" ng-show="fullNameTouched && profileForm.fullName.$error.required">
                Họ và tên là bắt buộc.
            </div>
        </div>
    </div>
    <div class="col-lg-6 mb-3" ng-class="{ 'has-error': phoneNumberTouched && (profileForm.phoneNumber.$invalid || (phoneNumber && !(phoneNumber | phoneNumberValidator))) }">
        <div class="form-floating">
            <input type="text" class="form-control" name="phoneNumber" required ng-model="phoneNumber" id="phoneNumber" placeholder="Nhập số điện thoại" ng-change="onInputChange('phoneNumber')">
            <label for="phoneNumber">Số điện thoại</label>
            <div class="text-danger" ng-show="phoneNumberTouched && profileForm.phoneNumber.$error.required">
                Số điện thoại là bắt buộc.
            </div>
            <div ng-show="phoneNumberTouched && phoneNumber && !(phoneNumber | phoneNumberValidator)">
                <small class="text-danger">Số điện thoại không hợp lệ. Vui lòng nhập đúng 10 chữ số.</small>
            </div>
        </div>
    </div>
</div>

                    <div class="col-lg-12 mb-3" ng-class="{ 'has-error': birthdateTouched && (profileForm.birthdate.$invalid || profileForm.birthdate.$error.validBirthdate) }">
                        <div class="form-floating">
                            <input type="date" class="form-control" id="focus_click" name="birthdate" ng-model="birthdate" required ng-change="onInputChange('birthdate')" valid-birthdate>
                            <label>Ngày sinh</label>
                            <div class="text-danger" ng-show="birthdateTouched && (profileForm.birthdate.$error.required || profileForm.birthdate.$error.validBirthdate)">
                                <span ng-show="profileForm.birthdate.$error.required">Ngày sinh là bắt buộc.</span>
                                <span ng-show="profileForm.birthdate.$error.validBirthdate">Tuổi phải từ 16 đến 150.</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12 mb-3" ng-class="{ 'has-error': genderTouched && profileForm.gender.$invalid }">
                        <div class="form-floating">
                            <select class="form-select" name="gender" required ng-model="gender" ng-change="onInputChange('gender')">
                                <option value="">Chọn giới tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                            <label>Giới tính</label>
                            <div class="text-danger" ng-show="genderTouched && profileForm.gender.$error.required">
                                Giới tính là bắt buộc.
                            </div>
                        </div>
                    </div>
                    <div class="mb-3 row" ng-class="{ 'has-error': province_cityTouched && profileForm.province_city.$invalid }">
                        <label class="col-form-label col-lg-3">Chọn tỉnh thành</label>
                        <div class="col-lg-9">
                                <select class="form-control select" name="province_city" ng-model="province_city" required ng-change="onInputChange('province_city')">
                                    <option value="">Chọn tỉnh thành</option>
                                   <optgroup label="Tỉnh thành Việt Nam">
                                       <option value="An Giang">An Giang</option>
                                        <option value="Cần Thơ">Cần Thơ</option>
                                       <option value="TPHCM">Thành phố Hồ Chí Minh</option>
                                   </optgroup>
                               </select>
                            <div class="text-danger" ng-show="province_cityTouched && profileForm.province_city.$error.required">
                                Tỉnh thành là bắt buộc.
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12 mb-3" ng-class="{ 'has-error': usernameTouched && (profileForm.username.$invalid || profileForm.username.$error.noSpaces || profileForm.username.$error.minlength) }">
                        <div class="form-floating">
                            <input type="text" class="form-control" name="username" ng-model="username" required id="focus_click" placeholder="Nhập tên tài khoản" ng-change="onInputChange('username')" no-spaces minlength="8">
                            <label>Tên tài khoản</label>
                            <div class="text-danger" ng-show="usernameTouched && profileForm.username.$error.required">
                                Tên tài khoản là bắt buộc.
                            </div>
                            <div class="text-danger" ng-show="usernameTouched && profileForm.username.$error.noSpaces">
                                Tên tài khoản không được chứa dấu cách.
                            </div>
                            <div class="text-danger" ng-show="usernameTouched && profileForm.username.$error.minlength">
                                Tên tài khoản phải có ít nhất 8 ký tự.
                            </div>
                        </div>
                    </div>
                   <div class="row">
    <div class="col-lg-6 mb-3" ng-class="{ 'has-error': passwordTouched && (profileForm.password.$invalid || profileForm.password.$error.noSpaces || !(password | passwordValidator)) }">
        <div class="form-floating">
            <input type="password" class="form-control" name="password" ng-model="password" required id="focus_click" placeholder="Nhập mật khẩu" ng-change="onInputChange('password')" password-validator>
            <label for="focus_click">Mật khẩu</label>
            <div class="text-danger" ng-show="passwordTouched && profileForm.password.$error.required">
                Mật khẩu là bắt buộc.
            </div>
            <div class="text-danger" ng-show="passwordTouched && profileForm.password.$error.noSpaces && !profileForm.password.$error.required">
                Mật khẩu không được chứa khoảng trắng.
            </div>
            <div class="text-danger" ng-show="passwordTouched && !(password | passwordValidator) && !profileForm.password.$error.required && !profileForm.password.$error.noSpaces">
                Mật khẩu phải có ít nhất 1 ký tự thường, 1 ký tự số, 1 ký tự đặc biệt và ít nhất 8 ký tự.
            </div>
        </div>
    </div>
    <div class="col-lg-6 mb-3" ng-class="{ 'has-error': confirmPasswordTouched && (profileForm.confirmPassword.$invalid || confirmPassword !== password) }">
        <div class="form-floating">
            <input type="password" class="form-control" name="confirmPassword" ng-model="confirmPassword" required id="focus_click" placeholder="Nhập lại mật khẩu" ng-change="onInputChange('confirmPassword')">
            <label>Nhập lại mật khẩu</label>
            <div class="text-danger" ng-show="confirmPasswordTouched && profileForm.confirmPassword.$error.required">
                Nhập lại mật khẩu là bắt buộc.
            </div>
            <div class="text-danger" ng-show="confirmPasswordTouched && confirmPassword !== password && !profileForm.confirmPassword.$error.required">
                Mật khẩu không khớp.
            </div>
        </div>
    </div>
</div>

                   <div class="col-lg-12 mb-3">
    <button class="btn btn-primary" type="submit" ng-disabled="profileForm.$invalid">Đăng ký</button>
</div>

                </form>
            </div>
        </div>
    `,
            controller: function ($scope, $http, $window) {
                $scope.fullNameTouched = false;
                $scope.phoneNumberTouched = false;
                $scope.birthdateTouched = false;
                $scope.genderTouched = false;
                $scope.province_cityTouched = false;
                $scope.usernameTouched = false;
                $scope.passwordTouched = false;
                $scope.confirmPasswordTouched = false;

                $scope.onInputChange = function (field) {
                    switch (field) {
                        case 'fullName':
                            $scope.fullNameTouched = true;
                            break;
                        case 'phoneNumber':
                            $scope.phoneNumberTouched = true;
                            break;
                        case 'birthdate':
                            $scope.birthdateTouched = true;
                            break;
                        case 'gender':
                            $scope.genderTouched = true;
                            break;
                        case 'province_city':
                            $scope.province_cityTouched = true;
                            break;
                        case 'username':
                            $scope.usernameTouched = true;
                            break;
                        case 'password':
                            $scope.passwordTouched = true;
                            break;
                        case 'confirmPassword':
                            $scope.confirmPasswordTouched = true;
                            break;
                    }
                }
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