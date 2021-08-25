<?php
//header('Content-Type: application/json');
defined('BASEPATH') OR exit('No direct script access allowed');

class Api extends CI_Controller {

	public function __construct(){
			parent::__construct();
			$this->load->model('apimodel');
			$this->load->helper('url_helper');
		}
	public function auth(){
		$req = $_SERVER['REQUEST_METHOD'];

		if($req == 'GET'){			
			$this->apimodel->auth();
		}

	}
	public function requestTasks(){
		$req = $_SERVER['REQUEST_METHOD'];
		if($req == 'GET'){
			$this->apimodel->requestTasks();
		}

	}
	public function addEmployee(){
		$req = $_SERVER['REQUEST_METHOD'];
		if($req == 'GET'){
			$this->apimodel->addEmployee();
		}

	}
	public function getEmployees(){
		$req = $_SERVER['REQUEST_METHOD'];
		if($req == 'GET'){
			$this->apimodel->getEmployees();
		}

	}
	public function deleteEmployee(){
		$req = $_SERVER['REQUEST_METHOD'];
		if($req == 'GET'){
			$this->apimodel->deleteEmployee();
		}

	}


	public function deleteTask(){
		$req = $_SERVER['REQUEST_METHOD'];
		if($req == 'GET'){
			$this->apimodel->deleteTask();
		}

	
	}
	public function getTasks(){
		$req = $_SERVER['REQUEST_METHOD'];
		if($req == 'GET'){
			$this->apimodel->getTasks();
		}

	}
	public function createTask(){
		$req = $_SERVER['REQUEST_METHOD'];
		if($req == 'GET'){
			$this->apimodel->createTask();
		}

	}
	public function createNotification(){
		$req = $_SERVER['REQUEST_METHOD'];
		if($req == 'GET'){
			$this->apimodel->createNotification();
		}

	}
	public function getNotification(){
		$req = $_SERVER['REQUEST_METHOD'];
		if($req == 'GET'){
			$this->apimodel->getNotification();
		}

	}


	//send user details
	public function userDetails(){
		$req = $_SERVER['REQUEST_METHOD'];
		if($req == 'GET'){
			$this->apimodel->userDetails();
		}
	}

	public function second_auth(){
		$req = $_SERVER['REQUEST_METHOD'];
		if($req == 'GET'){
			$this->apimodel->second_auth();
		}
		if($req == "POST"){
			
		}
	}


}
