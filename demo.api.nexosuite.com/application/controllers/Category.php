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

	




function format_uri( $string, $separator = '-' )
{
    $accents_regex = '~&([a-z]{1,2})(?:acute|cedil|circ|grave|lig|orn|ring|slash|th|tilde|uml);~i';
    $special_cases = array( '&' => 'and', "'" => '');
    $string = mb_strtolower( trim( $string ), 'UTF-8' );
    $string = str_replace( array_keys($special_cases), array_values( $special_cases), $string );
    $string = preg_replace( $accents_regex, '$1', htmlentities( $string, ENT_QUOTES, 'UTF-8' ) );
    $string = preg_replace("/[^a-z0-9]/u", "$separator", $string);
    $string = preg_replace("/[$separator]+/u", "$separator", $string);
    return $string;
}

	



	public function index()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');


		$posts = array();
				$categories = $this->category_model->get_categories_public();

		$category = array();
		if(!empty($categories)){
			foreach($categories as $cate){
				$category[] = array(
					'id' => $cate->id,
					'name' => $cate->category_name,
					'description' => $cate->category_description,
					'is_active' => $cate->is_active,

					'category_seo_url' => $cate->category_seo_url,

				);
			}
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($category));
		
	}




public function id_public($id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');


			$category = $this->category_model->get_id_public($id);

			$post = array(
				'id' => $category->id,
				'category_name' => $category->category_name,
				'category_description' => $category->category_description,
				'category_seo_url' => $category->category_seo_url,
				'is_active' => $category->is_active,

			);
			

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($post)); 
		
	}





	
public function list_user($user_id)
	{
		$category_name = $this->input->get('name');
		$category_description = $this->input->get('description');

		$size = $this->category_model->count_categories($category_name, $category_description,$user_id);
     
		header("Access-Control-Allow-Origin: *");
		header( "size: $size", TRUE );		
		//header( "x-total-count: $size", TRUE );	
		header( "Connection: Keep-Alive" );	
		header("Access-Control-Allow-Headers: authorization, Content-Type, size, x-total-count");
		header("Access-Control-Request-Headers: GET, POST, PUT");
		header("Access-Control-Expose-Headers: x-total-count");


		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

				$_start = $this->input->get('_start');
				$_limit = $this->input->get('_limit');
				$_sort = $this->input->get('_sort');
				//$code = $this->input->get('code');
				//$code_int = $this->input->get('code_int');
				$category_name = $this->input->get('name');
				$category_description = $this->input->get('description');

				//$works_id = $this->input->get('works_id');
				//$category_id = $this->input->get('category_id');
                
				if ($_limit !== NULL && $_limit > 100)
				{
					$_limit = 100;
				}

                if ($_start !== NULL && $_start > 0)
				{
					$_start =$_start*$_limit;
				}



			$posts = array();

			

			$blogs = $this->category_model->get_list($user_id, $_start, $_limit, $_sort, $category_name, $category_description);

			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'name' => $blog->category_name,
					'description' => $blog->category_description,
					'is_active' => $blog->is_active

				);
			}
			$total=count($posts);
			header( "size: $total", TRUE );			
			header( "x-total-count: $size", TRUE );	
			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($posts)); 
		


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
				'category_seo_url' => $category->category_seo_url,
				'is_active' => $category->is_active,
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
			$category_seo_url = $this->input->post('category_seo_url');
			$is_active = $this->input->post('is_active');

			$user_id = $this->input->post('user_id');

			$isUploadError = FALSE;

			

			if( ! $isUploadError) {
	        	$categoryData = array(
					'category_name' => $category_name,
					'category_description' => $category_description,
					'category_seo_url' => $category_seo_url,
					'is_active' => $is_active,

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
			$category_seo_url = $this->input->post('category_seo_url');
			$is_active = $this->input->post('is_active');
			$user_id = $this->input->post('user_id');


			$isUploadError = FALSE;

			

			if( ! $isUploadError) {
	        	$categoryData = array(
					'category_name' => $category_name,
					'category_description' => $category_description,
					'category_seo_url' => $category_seo_url,
					'is_active' => $is_active,
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