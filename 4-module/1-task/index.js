function makeFriendsList(friends) {
    let ul = document.createElement('ul');
    friends.forEach(function(friend) {
        let li = document.createElement('li');
        li.textContent = `${friend.firstName} ${friend.lastName}`;
        ul.appendChild(li);
    });
    return ul;
}

