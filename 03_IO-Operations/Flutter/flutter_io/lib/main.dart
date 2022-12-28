import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_io/data/services/product_service.dart';
import 'package:flutter_io/data/services/user_service.dart';

import 'data/services/cart_service.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  late StreamController<String?> streamController = StreamController<String?>();

  Future<dynamic> Function()? selectedItem;

  @override
  void initState() {
    super.initState();
    streamController.add("Empty");
  }

  @override
  void dispose() {
    streamController.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Flutter IO-Operationen"),
      ),
      body: SafeArea(
        child: Column(
          children: [
            DropdownButton<Future Function()>(
              items: _getDropdownItems(),
              onChanged: (selectedRequest) {
                if (selectedRequest != null) {
                  setState(() {
                    selectedItem = selectedRequest;
                  });
                  streamController.add(null);
                  var futureResponse = selectedRequest();
                  futureResponse.then(
                      (response) => streamController.add(response.toString()));
                }
              },
              value: selectedItem,
            ),
            Expanded(
              child: StreamBuilder(
                stream: streamController.stream,
                builder: ((context, snapshot) {
                  if (snapshot.hasData && snapshot.data != null) {
                    return SingleChildScrollView(child: Text(snapshot.data!));
                  } else if (snapshot.hasError) {
                    return Center(
                      child: Text("Error: ${snapshot.error}"),
                    );
                  } else {
                    return const Center(
                      child: CircularProgressIndicator(),
                    );
                  }
                }),
              ),
            ),
          ],
        ),
      ),
    );
  }

  List<DropdownMenuItem<Future Function()>> _getDropdownItems() {
    var list = List<DropdownMenuItem<Future Function()>>.empty(growable: true);
    list.add(const DropdownMenuItem<Future Function()>(
      value: fetchAllProducts,
      child: Text("all products"),
    ));
    list.add(const DropdownMenuItem<Future Function()>(
      value: fetchOneProduct,
      child: Text("one product"),
    ));
    list.add(const DropdownMenuItem<Future Function()>(
      value: addExampleProduct,
      child: Text("add product"),
    ));
    list.add(const DropdownMenuItem<Future Function()>(
      value: updateExampleProduct,
      child: Text("update product"),
    ));
    list.add(const DropdownMenuItem<Future Function()>(
      value: deleteExampleProduct,
      child: Text("delete product"),
    ));
    list.add(const DropdownMenuItem<Future Function()>(
      value: fetchAllCategories,
      child: Text("all categories"),
    ));
    list.add(const DropdownMenuItem<Future Function()>(
      value: fetchAllUser,
      child: Text("all user"),
    ));
    list.add(const DropdownMenuItem<Future Function()>(
      value: fetchAllCarts,
      child: Text("all cart's"),
    ));
    return list;
  }
}
