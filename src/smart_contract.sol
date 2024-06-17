// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.9.0;

contract ElectricityBill {
    uint256 golongan = 900; // VA atau 1300 VA
    uint256 tarifPerKWH = 1325; //; Rp 1.325
    uint256 public bill;

    struct User {
        string name;
        uint256 electricityUsage; // kwh
    }

    User[] user;

    mapping(string => uint256) public nameToElectricityUsage;

    function userBill(string memory _name, uint256 _electricityUsage) public {
        user.push(User(_name, electricityUsage));
        nameToElectricityUsage[_name] = _electricityUsage;
        bill = _electricityUsage * tarifPerKWH;
    }
}
