<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Timesheets_model extends CI_Model 
{
	








public function get_timesheets_by_project($id, $user_id, $_start, $_limit, $_sort, $category_name, $category_description)
	{

			$this->db->select('*');
            $this->db->from('timesheets');
			//$this->db->like('works.category_name', $category_name);
			//$this->db->like('works.category_description', $category_description);
			$this->db->where('timesheets.project_id', $id);
			$this->db->where('timesheets.user_id', $user_id);
			$this->db->where('timesheets.timesheets_type', 1);
			$this->db->order_by('created_at','DESC');

			 if($category_name!=NULL && $category_description!=NULL)
				{
				//$this->db->where('created_at >=',$startup_startDate); 
	            //$this->db->where('created_at <=',$startup_endDate);
				$this->db->where("timesheets.created_at BETWEEN '".$category_name."' AND '".$category_description."'");
			   }



			$this->db->order_by('id', 'DESC'); 
			if ($_start == 0 &&  $_limit != '') {
	            $this->db->limit($_limit);
	        } else if ($_start != 0  && $_limit != '') {
	            $this->db->limit($_limit,$_start);
	        }


		    $query  = $this->db->get();
			
            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return array();
            }
}




public function count_timesheets_by_project_search($category_name=NULL, $category_description=NULL, $user_id, $id)
	{
	$this->db->select('*');
	$this->db->from('timesheets');
	$this->db->where('timesheets.user_id', $user_id);
	$this->db->like('timesheets.project_id', $id);
	$this->db->where('timesheets.timesheets_type', 1);

	if($category_name!=NULL && $category_description!=NULL)
			{
			//$this->db->where('created_at >=',$startup_startDate); 
            //$this->db->where('created_at <=',$startup_endDate);
			$this->db->where("timesheets.created_at BETWEEN '".$category_name."' AND '".$category_description."'");
		   }
	
	return $this->db->count_all_results();
	
	}






public function get_list($user_id, $_start, $_limit, $_sort, $category_name, $category_description, $employee, $type, $project_id)
	{

			$this->db->select('*');
            $this->db->from('timesheets');
			//$this->db->like('works.category_name', $category_name);
			//$this->db->like('works.category_description', $category_description);
			$this->db->where('timesheets.user_id', $user_id);
			$this->db->like('timesheets.employee_id', $employee);
			$this->db->like('timesheets.timesheets_type', $type);
			$this->db->like('timesheets.project_id', $project_id);

			$this->db->order_by('created_at','DESC');

			 if($category_name!=NULL && $category_description!=NULL)
				{
				//$this->db->where('created_at >=',$startup_startDate); 
	            //$this->db->where('created_at <=',$startup_endDate);
				$this->db->where("timesheets.date_from BETWEEN '".$category_name."' AND '".$category_description."'");
			   }



			$this->db->order_by('id', 'DESC'); 
			if ($_start == 0 &&  $_limit != '') {
	            $this->db->limit($_limit);
	        } else if ($_start != 0  && $_limit != '') {
	            $this->db->limit($_limit,$_start);
	        }


		    $query  = $this->db->get();
			
            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return array();
            }
}




public function get_timesheets_calendar()
	{

			$this->db->select('*');
            $this->db->from('timesheets');
			$this->db->where('is_featured', '1');
			$this->db->order_by('date','DESC');

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}
	

public function get_timesheets($user_id)
	{

			$this->db->select('*');
            $this->db->from('timesheets');
			$this->db->where('timesheets.user_id', $user_id);

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}


public function get_timesheets_by_employee($id, $user_id, $_start, $_limit, $_sort, $category_name, $category_description, $project_id)
	{

			$this->db->select('*');
            $this->db->from('timesheets');
			//$this->db->like('works.category_name', $category_name);
			//$this->db->like('works.category_description', $category_description);
			$this->db->where('timesheets.employee_id', $id);
			$this->db->where('timesheets.user_id', $user_id);
			$this->db->like('timesheets.project_id', $project_id);

			$this->db->order_by('created_at','DESC');

			 if($category_name!=NULL && $category_description!=NULL)
				{
				//$this->db->where('created_at >=',$startup_startDate); 
	            //$this->db->where('created_at <=',$startup_endDate);
				$this->db->where("timesheets.date_from BETWEEN '".$category_name."' AND '".$category_description."'");
			   }



			$this->db->order_by('id', 'DESC'); 
			if ($_start == 0 &&  $_limit != '') {
	            $this->db->limit($_limit);
	        } else if ($_start != 0  && $_limit != '') {
	            $this->db->limit($_limit,$_start);
	        }


		    $query  = $this->db->get();
			
            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return array();
            }
}



public function count_timesheets_by_employee_search($category_name=NULL, $category_description=NULL, $project_id=NULL, $user_id, $id)
	{
	$this->db->select('*');
	$this->db->from('timesheets');
	$this->db->where('timesheets.user_id', $user_id);
	$this->db->like('timesheets.employee_id', $id);
	$this->db->like('timesheets.project_id', $project_id);

	if($category_name!=NULL && $category_description!=NULL)
			{
			//$this->db->where('created_at >=',$startup_startDate); 
            //$this->db->where('created_at <=',$startup_endDate);
			$this->db->where("timesheets.date_from BETWEEN '".$category_name."' AND '".$category_description."'");
		   }
	
	return $this->db->count_all_results();
	
	}








public function count_timesheets_search($category_name=NULL, $category_description=NULL, $employee=NULL, $type=NULL, $project_id=NULL, $user_id)
	{
	$this->db->select('*');
	$this->db->from('timesheets');
	$this->db->where('timesheets.user_id', $user_id);
	$this->db->like('timesheets.employee_id', $employee);
	$this->db->like('timesheets.timesheets_type', $type);
	$this->db->like('timesheets.project_id', $project_id);

	$this->db->order_by('created_at','DESC');

	if($category_name!=NULL && $category_description!=NULL)
			{
			//$this->db->where('created_at >=',$startup_startDate); 
            //$this->db->where('created_at <=',$startup_endDate);
			$this->db->where("timesheets.date_from BETWEEN '".$category_name."' AND '".$category_description."'");
		   }
	
	return $this->db->count_all_results();
	
	}



	public function count_timesheets($id)
	{
	$this->db->select('*');
	$this->db->from('timesheets');
	$this->db->where('timesheets.user_id', $id);

	echo $this->db->count_all_results();

	}





public function timesheet_by_project_employee($project_id, $user_id) {
        $userdata = array();

        $this->db->select('SUM(hours) as hours, employee_id');
        $this->db->from('timesheets');
        //$this->db->where('YEAR(date) = YEAR(NOW())');
        $this->db->where('project_id', $project_id);
        $this->db->where('timesheets_type', 1);


        $this->db->group_by('employee_id');
        $query = $this->db->get();

        foreach ($query->result_array() as $result) {
            $userdata[$result['employee_id']] = array(
                'x' => $result['employee_id'],
                'y' => $result['hours']
            );
        }

        return $userdata;
    }



public function count_total_timesheets_employee($id,$user_id)
	{
   $query = $this->db->query("select id, sum(hours) as total_amt from timesheets  WHERE employee_id = '$id' && user_id = '$user_id'");

				foreach ($query->result() as $row)
				{
				    echo $row->total_amt;
				}

	}


public function count_total_vacations_timesheets_employee($id,$user_id)
	{
   $query = $this->db->query("select id, sum(hours) as total_amt from timesheets  WHERE employee_id = '$id' && user_id = '$user_id' && timesheets_type = 2");

				foreach ($query->result() as $row)
				{
				    echo $row->total_amt;
				}

	}


public function count_total_permissions_timesheets_employee($id,$user_id)
	{
   $query = $this->db->query("select id, sum(hours) as total_amt from timesheets  WHERE employee_id = '$id' && user_id = '$user_id' && timesheets_type = 3");

				foreach ($query->result() as $row)
				{
				    echo $row->total_amt;
				}

	}



public function get_timesheets_date($current_month=NULL)
	{

			$date = new DateTime("now");
			$curr_date = $date->format('Y-m-d ');
			$this->db->select('*');
            $this->db->from('timesheets');
			$this->db->where('date(Date)',$curr_date);//use date function
			$this->db->order_by('date','ASC');

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}


	public function get_id($id)
	{

		$this->db->select('timesheets.*, u.first_name, u.last_name');
			$this->db->from('timesheets');
			$this->db->join('users u', 'u.id=timesheets.user_id');
			$this->db->where('timesheets.id', $id);
			$query = $this->db->get();
			return $query->row();
	}




	

	

	public function login($username, $password) 
	{
		$this->db->where('username', $username);
		$this->db->where('password', md5($password));
		$query = $this->db->get('users');

		if($query->num_rows() == 1) {
			return $query->row();
		}
	}


	public function checkToken($token)
	{
		$this->db->where('token', $token);
		$query = $this->db->get('users');

		if($query->num_rows() == 1) {
			return true;
		}
		return false;
	}

	public function create($blogData)
	{
		$this->db->insert('timesheets', $blogData);
		return $this->db->insert_id();
	}




	public function update($id, $blogData)
	{
		$this->db->where('id', $id);
		$this->db->update('timesheets', $blogData);
	}


	public function delete($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('timesheets');
	}


}
