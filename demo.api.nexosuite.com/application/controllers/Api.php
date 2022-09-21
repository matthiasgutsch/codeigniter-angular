<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Api extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('api_model');
		$this->load->helper('url');
		$this->load->helper('text');
	}

	



	public function login()
		{
			header("Access-Control-Allow-Origin: *");
			header("Access-Control-Request-Headers: GET");
			header('Access-Control-Allow-Headers: Accept,Accept-Language,Content-Language,Content-Type');
			
			
			$formdata = json_decode(file_get_contents('php://input'), true);
				
				$username = $formdata['username'];
				$password = $formdata['password'];
				$user = $this->api_model->login($username, $password);
				
				
				if($user) {
					$response = array(
						'user_id' => $user->id,
						'first_name' => $user->first_name,
						'username' => $user->username,
						'last_name' => $user->last_name,
						'token' => $this->api_model->create_token($user->id)
					);
				}
				else {
					$response = array();
				}
				
				$this->output
				->set_content_type('application/json')
				->set_output(json_encode($response));
			}


}
