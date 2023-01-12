import 'package:flutter/material.dart';
import 'package:flutter_io/data/models/user.dart';
import 'package:flutter_io/data/services/user_service.dart';
import 'package:flutter_io/screens/error_screen.dart';
import 'package:flutter_io/screens/loading_screen.dart';

class UsersScreen extends StatefulWidget {
  const UsersScreen({super.key});

  @override
  State<UsersScreen> createState() => _UsersScreenState();
}

class _UsersScreenState extends State<UsersScreen> {
  late Future<List<User>> users;

  @override
  void initState() {
    super.initState();
    users = fetchAllUser();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: users,
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          return const ErrorScreen();
        } else if (snapshot.hasData && snapshot.data != null) {
          return ListView.builder(
            padding: const EdgeInsets.all(10),
            itemCount: snapshot.data!.length,
            itemBuilder: ((context, index) {
              var user = snapshot.data![index];
              return _userItem(user);
            }),
          );
        } else {
          return const LoadingScreen();
        }
      },
    );
  }

  Widget _userItem(User user) {
    return Card(
      margin: const EdgeInsets.symmetric(vertical: 10),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              user.username,
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 8),
            _userInformationRow("firstname", user.name?.firstname ?? ""),
            _userInformationRow("lastname", user.name?.lastname ?? ""),
            const SizedBox(height: 8),
            _userInformationRow("email", user.email),
            _userInformationRow("phone", user.phone),
            const SizedBox(height: 8),
            _userInformationRow(
                "street", "${user.address?.street} ${user.address?.number}"),
            _userInformationRow(
                "city", "${user.address?.zipcode} ${user.address?.city}"),
          ],
        ),
      ),
    );
  }

  Widget _userInformationRow(String label, String value) {
    return Row(children: [
      Expanded(
        flex: 1,
        child: Text(
          label.toUpperCase(),
          style: const TextStyle(
              fontWeight: FontWeight.w300, fontSize: 12, color: Colors.grey),
        ),
      ),
      Expanded(
        flex: 2,
        child: Text(value),
      ),
    ]);
  }
}
