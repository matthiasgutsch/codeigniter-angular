<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Type extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('category_model');
		$this->load->helper('url');
		$this->load->helper('text');
	}

	



	public function categories()
	{
		header("Access-Control-Allow-Origin: *");

		$categories = $this->category_model->get_categories();

		$category = array();
		if(!empty($categories)){
			foreach($categories as $cate){
				$category[] = array(
					'id' => $cate->id,
					'name' => $cate->category_name
				);
			}
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($category));
	}

	



	public function adminCategories()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->category_model->checkToken($token);

		$posts = array();
		if($isValidToken) {
				$categories = $this->category_model->get_categories();

		$category = array();
		if(!empty($categories)){
			foreach($categories as $cate){
				$category[] = array(
					'id' => $cate->id,
					'name' => $cate->category_name,
					'address' => $cate->category_address,
					'description' => $cate->category_description
				);
			}
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($category));
		}
	}



	

	public function adminCategory($id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->category_model->checkToken($token);

		if($isValidToken) {

			$category = $this->category_model->get_admin_category($id);

			$post = array(
				'id' => $category->id,
				'category_name' => $category->category_name,
				'category_address' => $category->category_address,
				'category_description' => $category->category_description
			);
			

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($post)); 
		}
	}


	public function createCategory()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->category_model->checkToken($token);

		if($isValidToken) {

			$category_name = $this->input->post('category_name');
			$category_address = $this->input->post('category_address');

			$category_description = $this->input->post('category_description');

			$isUploadError = FALSE;

			

			if( ! $isUploadError) {
	        	$categoryData = array(
					'category_name' => $category_name,
					'category_address' => $category_address,
					'category_description' => $category_description

				);

				$id = $this->category_model->insertCategory($categoryData);

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





	public function updateCategory($id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->category_model->checkToken($token);

		if($isValidToken) {

			$category = $this->category_model->get_admin_category($id);

			$category_name = $this->input->post('category_name');
			$category_address = $this->input->post('category_address');
			$category_description = $this->input->post('category_description');


			$isUploadError = FALSE;

			

			if( ! $isUploadError) {
	        	$categoryData = array(
					'category_name' => $category_name,
					'category_address' => $category_address,
					'category_description' => $category_description

				);

				$this->category_model->updateCategory($id, $categoryData);

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

	
	public function deleteCategory($id)
	{
		header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->category_model->checkToken($token);

		if($isValidToken) {

			$blog = $this->category_model->get_admin_category($id);


			$this->category_model->deleteCategory($id);

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
