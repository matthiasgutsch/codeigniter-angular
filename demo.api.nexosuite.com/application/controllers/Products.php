<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Products extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('api_model');
		$this->load->model('products_model');
		$this->load->helper('url');
		$this->load->helper('text');
        $this->load->helper('api');

	}





public function list_public_category($user_id)
	{
		$title = $this->input->get('name');
		$description = $this->input->get('description');
		$brand = $this->input->get('brand');
		$orderBy = $this->input->get('orderBy');
		$orderByType = $this->input->get('orderByType');
		$size = $this->products_model->count_products_category_search_public($user_id, $title, $description, $brand);
     
		header("Access-Control-Allow-Origin: *");
		header( "size: $size", TRUE );		
		//header( "x-total-count: $size", TRUE );	
		header( "Connection: Keep-Alive" );	
		header("Access-Control-Allow-Headers: authorization, Content-Type, size, x-total-count");
		header("Access-Control-Request-Headers: GET");
		header("Access-Control-Expose-Headers: x-total-count");



				$_start = $this->input->get('_start');
				$_limit = $this->input->get('_limit');
				$_sort = $this->input->get('_sort');
				//$code = $this->input->get('code');
				//$code_int = $this->input->get('code_int');
				$title = $this->input->get('name');
				$description = $this->input->get('description');
				$brand = $this->input->get('brand');

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

			
			$blogs = $this->products_model->get_list_category($user_id, $_start, $_limit, $_sort, $title, $description, $brand, $orderByType, $orderBy);

			foreach($blogs as $blog) {
				$posts[] = array(
						'id' => $blog->id,
					'title' => $blog->title,
					'description' => $blog->description,
					'description_full' => $blog->description_full,
					'works_id' => $blog->works_id,
					'category_id' => $blog->category_id,
					'brand_id' => $blog->brand_id,
					'location_id' => $blog->location_id,
					'status' => $blog->status,
					'user_id' => $blog->user_id,
					'image' => base_url('media/images/'.$blog->image),
					'created_at' => $blog->created_at,
					'skills' => $blog->skills,
					'tags_id' => $blog->tags_id,
					'dimensions' => $blog->dimensions,
					'seo_url' => $this->format_uri($blog->title),
					'weight' => $blog->weight,
					'variationCost' => $blog->price,
					'code' => $blog->code,
					'price' => number_format($blog->price,2,'.',''),
					'qtyTotal' => 0

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

public function id_public($id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');



			$blog = $this->products_model->get_id_public($id);

			$post = array(
				'id' => $blog->id,
				'title' => $blog->title,
				'menuName' => $blog->title,
				'description' => $blog->description,
				'variationCost' => $blog->description,
				'image' => base_url('media/images/'.$blog->image),
				'is_featured' => $blog->is_featured,
				'status' => $blog->status,
				'user_id' => $blog->user_id,
				'category_id' => $blog->category_id,
				'description_full' => $blog->description_full,
				'works_id' => $blog->works_id,
				'seo_url' => $this->format_uri($blog->title),
				'code' => $blog->code,
				'code_int' => $blog->code_int,
				'brand_id' => $blog->brand_id,
				'tags_id' => $blog->tags_id,
				'skills' => $blog->skills,
				'location_id' => $blog->location_id,
				'price' => number_format($blog->price,2,'.',''),
				'is_active' => $blog->is_active,
				'is_featured' => $blog->is_featured,
				'variationCost' => $blog->price,
				'qtyTotal' => 0
			);
			

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($post)); 
		
	}





public function list_public()
	{
		$title = $this->input->get('name');
		$description = $this->input->get('description');
		$code = $this->input->get('code');
		$brand = $this->input->get('brand');
		$orderBy = $this->input->get('orderBy');
		$orderByType = $this->input->get('orderByType');

		$size = $this->products_model->count_products_search_public($title, $description, $brand, $code);
     
		header("Access-Control-Allow-Origin: *");
		header( "size: $size", TRUE );		
		//header( "x-total-count: $size", TRUE );	
		header( "Connection: Keep-Alive" );	
		header("Access-Control-Allow-Headers: authorization, Content-Type, size, x-total-count");
		header("Access-Control-Request-Headers: GET, POST, PUT");
		header("Access-Control-Expose-Headers: x-total-count");



				$_start = $this->input->get('_start');
				$_limit = $this->input->get('_limit');
				$_sort = $this->input->get('_sort');
				//$code = $this->input->get('code');
				//$code_int = $this->input->get('code_int');
				$title = $this->input->get('name');
				$description = $this->input->get('description');
				$code = $this->input->get('code');
				$brand = $this->input->get('brand');

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

			
			$blogs = $this->products_model->get_list_public($_start, $_limit, $_sort, $title, $description, $brand, $code, $orderBy, $orderByType);

			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'title' => $blog->title,
					'description' => $blog->description,
					'description_full' => $blog->description_full,
					'works_id' => $blog->works_id,
					'category_id' => $blog->category_id,
					'brand_id' => $blog->brand_id,
					'location_id' => $blog->location_id,
					'status' => $blog->status,
					'user_id' => $blog->user_id,
					'image' => base_url('media/images/'.$blog->image),
					'created_at' => $blog->created_at,
					'skills' => $blog->skills,
					'tags_id' => $blog->tags_id,
					'dimensions' => $blog->dimensions,
					'seo_url' => $this->format_uri($blog->title),
					'weight' => $blog->weight,
					'variationCost' => $blog->price,
					'code' => $blog->code,
					'price' => $blog->price,
					'is_featured' => $blog->is_featured,
					'qtyTotal' => 0

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



	public function products_by_client($id)
	{	
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token);

		if($isValidToken) {

		$items = $this->products_model->get_products_by_client($id);

		$posts = array();
		if(!empty($items)){
			foreach($items as $item){


				$posts[] = array(
					'id' => $item->id,
					'title' => $item->title,
					'description' => $item->description,
					'description_full' => $item->description_full,
					'works_id' => $item->works_id,
					'category_id' => $item->category_id,
					'brand_id' => $item->brand_id,
					'location_id' => $item->location_id,
					'status' => $item->status,
					'code' => $item->code,
					'code_int' => $item->code_int,
					'image' => base_url('media/images/'.$item->image),
					'created_at' => $item->created_at,
					'price' => $item->price,
					'price_extra' => $item->price_extra,

				);
			}
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($posts));
	}
}



	public function count($id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $id);

		if($isValidToken) {

			$posts = $this->products_model->count_products($id);
	
		}
	}


	public function index()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token);

		$posts = array();
		if($isValidToken) {
			$blogs = $this->products_model->get_products();
			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'title' => $blog->title,
					'description' => $blog->description,
					'description_full' => $blog->description_full,
					'works_id' => $blog->works_id,
					'category_id' => $blog->category_id,
					'brand_id' => $blog->brand_id,
					'location_id' => $blog->location_id,
					'code' => $blog->code,
					'code_int' => $blog->code_int,
					'status' => $blog->status,
					'price' => $blog->price,
					'price_extra' => $blog->price_extra,
					'image' => base_url('media/images/'.$blog->image),
					'created_at' => $blog->created_at

				);
			}

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($posts)); 
		}
	}



public function list_user($user_id)
	{
		$title = $this->input->get('name');
		$description = $this->input->get('description');
		$code = $this->input->get('code');
		$code_int = $this->input->get('code_int');
		$brand = $this->input->get('brand');

		$size = $this->products_model->count_products_search($title, $description, $code, $code_int, $brand, $user_id);
     
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
				$title = $this->input->get('name');
				$description = $this->input->get('description');
				$code = $this->input->get('code');
				$code_int = $this->input->get('code_int');
				$brand = $this->input->get('brand');

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

			
			if($isValidToken) {
			$blogs = $this->products_model->get_list($user_id, $_start, $_limit, $_sort, $title, $description, $code, $code_int, $brand);

			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'title' => $blog->title,
					'description' => $blog->description,
					'description_full' => $blog->description_full,
					'works_id' => $blog->works_id,
					'category_id' => $blog->category_id,
					'brand_id' => $blog->brand_id,
					'location_id' => $blog->location_id,
					'code' => $blog->code,
					'code_int' => $blog->code_int,
					'status' => $blog->status,
					'user_id' => $blog->user_id,
					'price' => $blog->price,
					'price_extra' => $blog->price_extra,
					'image' => base_url('media/images/'.$blog->image),
					'created_at' => $blog->created_at,
					'skills' => $blog->skills,
					'dimensions' => $blog->dimensions,
					'weight' => $blog->weight,

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

	}



public function user($user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		$posts = array();
		if($isValidToken) {
			$blogs = $this->products_model->get_products($user_id);
			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'title' => $blog->title,
					'description' => $blog->description,
					'description_full' => $blog->description_full,
					'works_id' => $blog->works_id,
					'category_id' => $blog->category_id,
					'brand_id' => $blog->brand_id,
					'location_id' => $blog->location_id,
					'code' => $blog->code,
					'code_int' => $blog->code_int,
					'status' => $blog->status,
					'user_id' => $blog->user_id,
					'price' => $blog->price,
					'price_extra' => $blog->price_extra,
					'image' => base_url('media/images/'.$blog->image),
					'created_at' => $blog->created_at,
					'skills' => $blog->skills,
					'dimensions' => $blog->dimensions,
					'weight' => $blog->weight,
				);
			}

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($posts)); 
		}
	}



	public function today()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');


		$isValidToken = $this->api_model->checkToken($token);

		$posts = array();
		if($isValidToken) {

			$blogs = $this->products_model->get_products_date();
			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'title' => $blog->title,
					'description' => $blog->description,
					'description_full' => $blog->description_full,
					'works_id' => $blog->works_id,
					'category_id' => $blog->category_id,
					'brand_id' => $blog->brand_id,
					'location_id' => $blog->location_id,
					'code' => $blog->code,
					'code_int' => $blog->code_int,
					'price' => $blog->price,
					'price_extra' => $blog->price_extra,
					'status' => $blog->status,
					'user_id' => $blog->user_id,
					'image' => base_url('media/images/'.$blog->image),
					'created_at' => $blog->created_at

				);
			}

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($posts)); 
		
			}
		}
	
	
	public function calendar()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token);

		$posts = array();
		if($isValidToken) {
			$blogs = $this->products_model->get_products_calendar();
			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'title' => $blog->title,
					'description' => $blog->description,
					'description_full' => $blog->description_full,
					'works_id' => $blog->works_id,
					'category_id' => $blog->category_id,
					'brand_id' => $blog->brand_id,
					'location_id' => $blog->location_id,
					'code' => $blog->code,
					'status' => $blog->status,
					'code_int' => $blog->code_int,
					'price' => $blog->price,
					'price_extra' => $blog->price_extra,
					'image' => base_url('media/images/'.$blog->image),
					'created_at' => $blog->created_at

				);
			}

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($posts)); 
		}
	}

	public function id($id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$blog = $this->products_model->get_id($id);

			$post = array(
				'id' => $blog->id,
				'title' => $blog->title,
				'description' => $blog->description,
				'image' => base_url('media/images/'.$blog->image),
				'is_featured' => $blog->is_featured,
				'code' => $blog->code,
				'code_int' => $blog->code_int,
				'status' => $blog->status,
				'user_id' => $blog->user_id,
				'category_id' => $blog->category_id,
				'price' => $blog->price,
				'price_extra' => $blog->price_extra,
				'description_full' => $blog->description_full,
				'works_id' => $blog->works_id,
				'brand_id' => $blog->brand_id,
				'skills' => $blog->skills,
				'location_id' => $blog->location_id,
				'is_active' => $blog->is_active
			);
			

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($post)); 
		}
	}

	
	public function skills($id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

			$blog = $this->products_model->get_id($id);

			$post = array(			
				$blog->skills
			);
			

			$this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output($blog->skills); 
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

			$title = $this->input->post('title');
			$description = $this->input->post('description');
			$is_featured = $this->input->post('is_featured');
			$is_active = $this->input->post('is_active');
			$code = $this->input->post('code');
			$code_int = $this->input->post('code_int');
			$description_full = $this->input->post('description_full');
			$works_id = $this->input->post('works_id');
			$category_id = $this->input->post('category_id');
			$status = $this->input->post('status');
			$user_id = $this->input->post('user_id');
			$location_id = $this->input->post('location_id');
			$brand_id = $this->input->post('brand_id');
			$works_id = $this->input->post('works_id');
			$skills = $this->input->post('skills');
			$price = $this->input->post('price');
			$price_extra = $this->input->post('price_extra');

			$filename = NULL;

			$isUploadError = FALSE;

			if ($_FILES && $_FILES['image']['name']) {

				$config['upload_path']          = './media/images/';
	            $config['allowed_types']        = 'gif|jpg|png|jpeg';
	            $config['max_size']             = 500;

	            $this->load->library('upload', $config);
	            if ( ! $this->upload->do_upload('image')) {

	            	$isUploadError = TRUE;

					$response = array(
						'status' => 'error',
						'message' => $this->upload->display_errors()
					);
	            }
	            else {
	            	$uploadData = $this->upload->data();
            		$filename = $uploadData['file_name'];
	            }
			}

			if( ! $isUploadError) {
	        	$blogData = array(
				'title' => $title,
					'user_id' => 1,
					'description' => $description,
					'image' => $filename,
					'description_full' => $description_full,
					'works_id' => $works_id,
					'category_id' => $category_id,
					'brand_id' => $brand_id,
					'status' => $status,
					'location_id' => $location_id,
					'code' => $code,
					'user_id' => $user_id,
					'code_int' => $code_int,
					'price' => $price,
					'price_extra' => $price_extra,
					'is_featured' => $is_featured,
					'is_active' => $is_active,
					'skills' => $skills,
					'created_at' => date('Y-m-d H:i:s', time())
				);

				$id = $this->products_model->create($blogData);

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

			$blog = $this->products_model->get_id($id);
			$filename = $blog->image;

			$title = $this->input->post('title');
			$description = $this->input->post('description');
			$description_full = $this->input->post('description_full');
			$works_id = $this->input->post('works_id');
			$location_id = $this->input->post('location_id');
			$brand_id = $this->input->post('brand_id');
			$status = $this->input->post('status');
			$price = $this->input->post('price');
			$price_extra = $this->input->post('price_extra');
			$code = $this->input->post('code');
			$code_int = $this->input->post('code_int');
			$user_id = $this->input->post('user_id');
			$category_id = $this->input->post('category_id');

			$is_featured = $this->input->post('is_featured');
			$is_active = $this->input->post('is_active');
			$skills = $this->input->post('skills');


			$isUploadError = FALSE;

			if ($_FILES && $_FILES['image']['name']) {

				$config['upload_path']          = './media/images/';
	            $config['allowed_types']        = 'gif|jpg|png|jpeg';
				$config['max_size']             = 500;
                $config['max_width']            = 1200;
                $config['max_height']           = 1200;
				$config['encrypt_name']     	= TRUE;
	            $this->load->library('upload', $config);
	            if ( ! $this->upload->do_upload('image')) {

	            	$isUploadError = TRUE;

					$response = array(
						'status' => 'error',
						'message' => $this->upload->display_errors()
					);
	            }
	            else {
	   
					if($blog->image && file_exists(FCPATH.'media/images/'.$blog->image))
					{
						unlink(FCPATH.'media/images/'.$blog->image);
					}

	            	$uploadData = $this->upload->data();
            		$filename = $uploadData['file_name'];
	            }
			}


			if( ! $isUploadError) {
	        	$blogData = array(
					'title' => $title,
					'user_id' => 1,
					'description' => $description,
					'description_full' => $description_full,
					'works_id' => $works_id,
					'category_id' => $category_id,
					'location_id' => $location_id,
					'brand_id' => $brand_id,
					'status' => $status,
					'code' => $code,
					'user_id' => $user_id,
					'price' => $price,
					'price_extra' => $price_extra,
					'code_int' => $code_int,
					'image' => $filename,
					'is_featured' => $is_featured,
					'is_active' => $is_active,
					'skills' => $skills

				);

				$this->products_model->update($id, $blogData);

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

			$blog = $this->products_model->get_id($id);

			if($blog->image && file_exists(FCPATH.'media/images/'.$blog->image))
			{
				unlink(FCPATH.'media/images/'.$blog->image);
			}

			$this->products_model->delete($id);

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