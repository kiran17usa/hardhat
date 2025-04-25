//SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract SimpleStorage {
    uint256 myFavouriteNumber; //initialzie to 0

    struct Person {
        uint256 favouriteNumber;
        string name;
    }

    //Person public myFriend = Person(7, "Pat");
    //Person public pat = Person({favouriteNumber:7, name: "Pat"});
    //Person public mariah = Person({favouriteNumber:8, name: "Mariah"});

    //write array instead above - the below is dynamic
    Person[] public listOfPeople;
    //Person[3] - static only 3

    mapping(string => uint256) public nameToFavouriteNumber;

    function store(uint256 _favouriteNumber) public virtual {
        myFavouriteNumber = _favouriteNumber;
    }

    //view - just read, pure - no read/write - just returns something
    //the above myFavouriteNumber is public storage permanant can access with out a funciton through retreive
    function retrieve() public view returns (uint256) {
        return myFavouriteNumber;
    }

    //call data - temp cant modify , memory tem can modify, storage - permanant cant modify

    function addPerson(string calldata _name, uint256 _favouriteNumber) public {
        //_name = "cat"; //can be re assigned if _name is memory or something
        //_name is calldata then error - restricting re assignment
        //Person memory newPerson = Person(_favouriteNumber, _name);
        //listOfPeople.push(newPerson);
        //instead of above 2 lines
        listOfPeople.push(Person(_favouriteNumber, _name));
        nameToFavouriteNumber[_name] = _favouriteNumber;
    }
}
