<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Timesheets extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('api_model');
		$this->load->model('timesheets_model');
		$this->load->model('employee_model');
		$this->load->model('projects_model');
		$this->load->helper('url');
		$this->load->helper('text');
        $this->load->helper('api');

	}



	public function timesheets_by_client($id)
	{	
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token);

		if($isValidToken) {

		$items = $this->timesheets_model->get_timesheets_by_client($id);

		$posts = array();
		if(!empty($items)){
			foreach($items as $item){


				$posts[] = array(
					'id' => $item->id,
					'title' => $item->title,
					'timesheets_type' => $item->timesheets_type,
					'description' => $item->description,
					'description_full' => $item->description_full,
					'works_id' => $item->works_id,
					'project_id' => $item->project_id,
					'employee_id' => $item->employee_id,
					'location_id' => $item->location_id,
					'status' => $item->status,
					'code' => $item->code,
					'code_int' => $item->code_int,
					'image' => base_url('media/images/'.$item->image),
					'created_at' => $item->created_at,
					'hours' => $item->hours,
					'hours_extra' => $item->hours_extra,

				);
			}
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($posts));
	}
}




public function count_total_timesheets_employee($id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");


		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {



		$posts = $this->timesheets_model->count_total_timesheets_employee($id, $user_id);

		
		}
	}


public function count_total_vacations_timesheets_employee($id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");


		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		

		$posts = $this->timesheets_model->count_total_vacations_timesheets_employee($id, $user_id);

		
		
	}


public function count_total_permissions_timesheets_employee($id, $user_id)
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");


		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		

		$posts = $this->timesheets_model->count_total_permissions_timesheets_employee($id, $user_id);

		
		
	}

public function timesheet_by_project_employee($project_id, $user_id) {

		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');
		$isValidToken = $this->api_model->checkToken($token, $user_id);

        foreach ($this->timesheets_model->timesheet_by_project_employee($project_id, $user_id) as $result) {
            $data[] = array(
                'id' => $result['x'],
                'value' => number_format((float)$result['y'], 0, '.', ''),
            );
        }

        $this->output
				->set_status_header(200)
				->set_content_type('application/json')
				->set_output(json_encode($data)); 
    

  }






public function timesheets_by_employee_calendar($id, $user_id)
	{	
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

		$items = $this->timesheets_model->get_timesheets_by_employee($id, $user_id);

		$posts = array();
		if(!empty($items)){
			foreach($items as $item){


				$posts[] = array(
					'id' => $item->id,
					'timesheets_type' => $item->timesheets_type,
					'start' => $item->date_from,
					'end' => $item->date_to,
					'description' => $item->description,
					'works_id' => $item->works_id,
					'project_id' => $item->project_id,
					'employee_id' => $item->employee_id,
					'location_id' => $item->location_id,
					'status' => $item->status,
					'created_at' => $item->created_at,
					'title' => $item->hours,
					'hours_extra' => $item->hours_extra,

				);
			}
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($posts));
	}
}


public function timesheets_by_project($id, $user_id)
	{	
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

		$items = $this->timesheets_model->get_timesheets_by_project($id, $user_id);

		$posts = array();
		if(!empty($items)){
			foreach($items as $item){


				$posts[] = array(
					'id' => $item->id,
					'timesheets_type' => $item->timesheets_type,
					'date_from' => $item->date_from,
					'date_to' => $item->date_to,
					'description' => $item->description,
					'works_id' => $item->works_id,
					'project_id' => $item->project_id,
					'employee_id' => $item->employee_id,
					'location_id' => $item->location_id,
					'status' => $item->status,
					'created_at' => $item->created_at,
					'hours' => $item->hours,
					'hours_extra' => $item->hours_extra,

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

			$posts = $this->timesheets_model->count_timesheets($id);
	
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
			$blogs = $this->timesheets_model->get_timesheets();
			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'timesheets_type' => $blog->timesheets_type,
					'title' => $blog->title,
					'description' => $blog->description,
					'description_full' => $blog->description_full,
					'works_id' => $blog->works_id,
					'project_id' => $blog->project_id,
					'employee_id' => $blog->employee_id,
					'location_id' => $blog->location_id,
					'code' => $blog->code,
					'code_int' => $blog->code_int,
					'status' => $blog->status,
					'hours' => $blog->hours,
					'hours_extra' => $blog->hours_extra,
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



public function timesheets_by_employee_old($id, $user_id)
	{	
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: authorization, Content-Type");

		$token = $this->input->get_request_header('Authorization');

		$isValidToken = $this->api_model->checkToken($token, $user_id);

		if($isValidToken) {

		$items = $this->timesheets_model->get_timesheets_by_employee($id, $user_id);

		$posts = array();
		if(!empty($items)){
			foreach($items as $item){


				$posts[] = array(
					

				);
			}
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($posts));
	}
}



public function timesheets_by_employee($id, $user_id)
	{
		$category_name = $this->input->get('name');
		$category_description = $this->input->get('description');

		$size = $this->timesheets_model->count_timesheets_by_employee_search($category_name, $category_description, $user_id, $id);
     
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
				$employee = $this->input->get('employee');

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

			$blogs = $this->timesheets_model->get_timesheets_by_employee($id, $user_id, $_start, $_limit, $_sort, $category_name, $category_description);

			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'timesheets_type' => $blog->timesheets_type,
					'date_from' => $blog->date_from,
					'date_to' => $blog->date_to,
					'description' => $blog->description,
					'works_id' => $blog->works_id,
					'project_id' => $blog->project_id,
					'employee_id' => $blog->employee_id,
					'location_id' => $blog->location_id,
					'status' => $blog->status,
					'created_at' => $blog->created_at,
					'hours' => $blog->hours,
					'hours_extra' => $blog->hours_extra,
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




public function list_user($user_id)
	{
		$category_name = $this->input->get('name');
		$category_description = $this->input->get('description');
		$employee = $this->input->get('employee');

		$size = $this->timesheets_model->count_timesheets_search($category_name, $category_description, $employee, $user_id);
     
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
				$employee = $this->input->get('employee');

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


			$blogs = $this->timesheets_model->get_list($user_id, $_start, $_limit, $_sort, $category_name, $category_description, $employee);

			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'timesheets_type' => $blog->timesheets_type,
					'date_from' => $blog->date_from,
					'date_to' => $blog->date_to,
					'description' => $blog->description,
					'works_id' => $blog->works_id,
					'project_id' => $blog->project_id,
					'project' => $this->projects_model->get_id($blog->project_id),
					'employee_id' => $blog->employee_id,
					'employee' => $this->employee_model->get_id($blog->employee_id),
					'location_id' => $blog->location_id,
					'status' => $blog->status,
					'user_id' => $blog->user_id,
					'hours' => $blog->hours,
					'hours_extra' => $blog->hours_extra,
					'created_at' => $blog->created_at,
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
			$blogs = $this->timesheets_model->get_timesheets($user_id);
			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'timesheets_type' => $blog->timesheets_type,
					'date_from' => $blog->date_from,
					'date_to' => $blog->date_to,
					'description' => $blog->description,
					'works_id' => $blog->works_id,
					'project_id' => $blog->project_id,
					'employee_id' => $blog->employee_id,
					'location_id' => $blog->location_id,
					'status' => $blog->status,
					'user_id' => $blog->user_id,
					'hours' => $blog->hours,
					'hours_extra' => $blog->hours_extra,
					'created_at' => $blog->created_at,

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

			$blogs = $this->timesheets_model->get_timesheets_date();
			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'timesheets_type' => $blog->timesheets_type,
					'title' => $blog->title,
					'description' => $blog->description,
					'description_full' => $blog->description_full,
					'works_id' => $blog->works_id,
					'project_id' => $blog->project_id,
					'employee_id' => $blog->employee_id,
					'location_id' => $blog->location_id,
					'code' => $blog->code,
					'code_int' => $blog->code_int,
					'hours' => $blog->hours,
					'hours_extra' => $blog->hours_extra,
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
			$blogs = $this->timesheets_model->get_timesheets_calendar();
			foreach($blogs as $blog) {
				$posts[] = array(
					'id' => $blog->id,
					'timesheets_type' => $blog->timesheets_type,
					'description' => $blog->description,
					'works_id' => $blog->works_id,
					'project_id' => $blog->project_id,
					'employee_id' => $blog->employee_id,
					'location_id' => $blog->location_id,
					'date_from' => $blog->date_from,
					'date_to' => $blog->date_to,
					'status' => $blog->status,
					'hours' => $blog->hours,
					'hours_extra' => $blog->hours_extra,
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

			$blog = $this->timesheets_model->get_id($id);

			$post = array(
					'id' => $blog->id,
					'timesheets_type' => $blog->timesheets_type,
					'description' => $blog->description,
					'works_id' => $blog->works_id,
					'project_id' => $blog->project_id,
					'employee_id' => $blog->employee_id,
					'location_id' => $blog->location_id,
					'status' => $blog->status,
					'date_from' => $blog->date_from,
					'date_to' => $blog->date_to,
					'hours' => $blog->hours,
					'hours_extra' => $blog->hours_extra,
					'created_at' => $blog->created_at
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

			$date_from = $this->input->post('date_from');
			$timesheets_type = $this->input->post('timesheets_type');
			$date_to = $this->input->post('date_to');
			$description = $this->input->post('description');
			$works_id = $this->input->post('works_id');
			$project_id = $this->input->post('project_id');
			$status = $this->input->post('status');
			$user_id = $this->input->post('user_id');
			$employee_id = $this->input->post('employee_id');
			$hours = $this->input->post('hours');
			$hours_extra = $this->input->post('hours_extra');

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
					'description' => $description,
					'timesheets_type' => $timesheets_type,
					'date_from' => $date_from,
					'date_to' => $date_to,
					'project_id' => $project_id,
					'employee_id' => $employee_id,
					'status' => $status,
					'user_id' => $user_id,
					'hours' => $hours,
					'hours_extra' => $hours_extra,
					//'is_active' => $is_active,
					'created_at' => date('Y-m-d H:i:s', time())
				);

				$id = $this->timesheets_model->create($blogData);

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

			$blog = $this->timesheets_model->get_id($id);
			$date_from = $this->input->post('date_from');
			$timesheets_type = $this->input->post('timesheets_type');
			$date_to = $this->input->post('date_to');
			$description = $this->input->post('description');
			$works_id = $this->input->post('works_id');
			$project_id = $this->input->post('project_id');
			$status = $this->input->post('status');
			$user_id = $this->input->post('user_id');
			$employee_id = $this->input->post('employee_id');
			$hours = $this->input->post('hours');
			$hours_extra = $this->input->post('hours_extra');


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
					'description' => $description,
					'timesheets_type' => $timesheets_type,
					'date_from' => $date_from,
					'date_to' => $date_to,
					'project_id' => $project_id,
					'employee_id' => $employee_id,
					'status' => $status,
					'user_id' => $user_id,
					'hours' => $hours,
					'hours_extra' => $hours_extra,
					//'is_active' => $is_active,
					'created_at' => date('Y-m-d H:i:s', time())

				);

				$this->timesheets_model->update($id, $blogData);

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

			$blog = $this->timesheets_model->get_id($id);


			$this->timesheets_model->delete($id);

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