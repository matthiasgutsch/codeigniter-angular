<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Category extends CI_Controller {

		public function __construct()
	{
		parent::__construct();
		$this->load->model('category_model');
		$this->load->model('api_model');
		$this->load->model('api_model');

		$this->load->helper('url');
		$this->load->helper('text');
	}

	






	



	public function index()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token);

		$posts = array();
		if($isValidToken) {
				$categories = $this->category_model->get_categories();

		$category = array();
		if(!empty($categories)){
			foreach($categories as $cate){
				$category[] = array(
					'id' => $cate->id,
					'name' => $cate->category_name,
					'description' => $cate->category_description
				);
			}
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($category));
		}
	}



public function user($user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		$posts = array();
		if($isValidToken) {
				$categories = $this->category_model->get_categories($user_id);

		$category = array();
		if(!empty($categories)){
			foreach($categories as $cate){
				$category[] = array(
					'id' => $cate->id,
					'name' => $cate->category_name,
					'description' => $cate->category_description
				);
			}
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($category));
		}
	}

	

	public function id($id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$category = $this->category_model->get_id($id);

			$post = array(
				'id' => $category->id,
				'category_name' => $category->category_name,
				'category_description' => $category->category_description,
				'user_id' => $category->user_id

			);
			

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($post)); 
		}
	}


	public function create($user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$category_name = $this->input->post('category_name');
			$category_description = $this->input->post('category_description');
			$user_id = $this->input->post('user_id');

			$isUploadError = FALSE;

			

			if( ! $isUploadError) {
	        	$categoryData = array(
					'category_name' => $category_name,
					'category_description' => $category_description,
					'user_id' => $user_id

				);

				$id = $this->category_model->create($categoryData);

				$response = array(
					'status' => 'success'
				);
			}

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($response)); 
		}
	}





	public function update($id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$category = $this->category_model->get_id($id);

			$category_name = $this->input->post('category_name');
			$category_description = $this->input->post('category_description');
			$user_id = $this->input->post('user_id');


			$isUploadError = FALSE;

			

			if( ! $isUploadError) {
	        	$categoryData = array(
					'category_name' => $category_name,
					'category_description' => $category_description,
					'user_id' => $user_id

				);

				$this->category_model->update($id, $categoryData);

				$response = array(
					'status' => 'success'
				);
           	}

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($response)); 
		}
	}

	
	public function delete($id, $user_id)
	{
		header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$blog = $this->category_model->get_id($id);


			$this->category_model->delete($id);

			$response = array(
				'status' => 'success'
			);

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($response)); 
		}
	}
}