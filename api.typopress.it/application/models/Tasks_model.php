<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Tasks_model extends CI_Model 
{
	

	public function get_tasks_by_client($id = null)
	{
        if ($id != null) {
            $this->db->select('*');
            $this->db->from('tasks');
            $this->db->where('category_id', $id);
			$this->db->order_by('date','DESC');

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }

        } else {
            return null;
        }

    }




public function get_tasks_by_employee($id, $user_id)
	{

			$this->db->select('*');
            $this->db->from('tasks');
			$this->db->where('tasks.employee_id', $id);
			$this->db->where('tasks.user_id', $user_id);

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}




public function get_tasks_calendar()
	{

			$this->db->select('*');
            $this->db->from('tasks');
			$this->db->where('is_featured', '1');
			$this->db->order_by('date','DESC');

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}
	

public function get_tasks($user_id)
	{

			$this->db->select('*');
            $this->db->from('tasks');
			$this->db->where('tasks.user_id', $user_id);

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}


public function get_tasks_project($project_id, $user_id)
	{

			$this->db->select('*');
            $this->db->from('tasks');
			$this->db->where('tasks.project_id', $project_id);
			$this->db->where('tasks.user_id', $user_id);

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}



	public function count_tasks($id)
	{
	$this->db->select('*');
	$this->db->from('tasks');
	$this->db->where('tasks.user_id', $id);

	echo $this->db->count_all_results();

	}





public function get_tasks_date($current_month=NULL)
	{

			$date = new DateTime("now");
			$curr_date = $date->format('Y-m-d ');
			$this->db->select('*');
            $this->db->from('tasks');
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

		$this->db->select('tasks.*, u.first_name, u.last_name');
			$this->db->from('tasks');
			$this->db->join('users u', 'u.id=tasks.user_id');
			$this->db->where('tasks.id', $id);
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
		$this->db->insert('tasks', $blogData);
		return $this->db->insert_id();
	}




	public function update($id, $blogData)
	{
		$this->db->where('id', $id);
		$this->db->update('tasks', $blogData);
	}


	public function delete($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('tasks');
	}


}
