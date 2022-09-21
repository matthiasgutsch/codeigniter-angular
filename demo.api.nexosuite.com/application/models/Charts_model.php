<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Charts_model extends CI_Model 
{
	

	public function get_products_by_client($id = null)
	{
        if ($id != null) {
            $this->db->select('*');
            $this->db->from('products');
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



public function get_products_calendar()
	{

			$this->db->select('*');
            $this->db->from('products');
			$this->db->where('is_featured', '1');
			$this->db->order_by('date','DESC');

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}
	



public function get_monthly_total_invoice($user_id) {
        $userdata = array();

        $this->db->select('SUM(total) as total, date');
        $this->db->from('billings');
        //$this->db->where('YEAR(date) = YEAR(NOW())');
        $this->db->where('YEAR(date) = 2021');

		$this->db->where('billings.user_id', $user_id);

        $this->db->group_by('MONTH(date)');
        $query = $this->db->get();

        foreach ($query->result_array() as $result) {
            $userdata[date('n', strtotime($result['date']))] = array(
                'x' => date('m', strtotime($result['date'])),
                'y' => $result['total']
            );
        }

        return $userdata;
    }



public function get_monthly_total_invoice_none($user_id) {
        $userdata = array();

        $this->db->select('SUM(total) as total, date');
        $this->db->from('billings');
        //$this->db->where('YEAR(date) = YEAR(NOW())');
        $this->db->where('YEAR(date) = 2021');

		$this->db->where('billings.user_id', $user_id);
		$this->db->where('billings.is_paid', 0);

        $this->db->group_by('MONTH(date)');
        $query = $this->db->get();

        foreach ($query->result_array() as $result) {
            $userdata[date('n', strtotime($result['date']))] = array(
                'x' => date('m', strtotime($result['date'])),
                'y' => $result['total']
            );
        }

        return $userdata;
    }



public function get_monthly_user_total() {
        $userdata = array();

        $this->db->select('COUNT(id) as total, created_at');
        $this->db->from('clients');
        $this->db->where('YEAR(created_at) = YEAR(NOW())');
        $this->db->group_by('MONTH(created_at)');
        $query = $this->db->get();

        foreach ($query->result_array() as $result) {
            $userdata[date('n', strtotime($result['created_at']))] = array(
                'month' => date('m', strtotime($result['created_at'])),
                'total' => $result['total']
            );
        }

        return $userdata;
    }


public function findSensorsByDate($user_id)
     {

			$this->db->select('*');
            $this->db->from('billings');
			$this->db->where('month(date)', date('11'));
			$this->db->where('billings.user_id', $user_id);

			$this->db->order_by('date','ASC');
            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}


public function get_products($user_id)
	{

			$this->db->select('*');
            $this->db->from('products');
			$this->db->where('products.user_id', $user_id);

            $query = $this->db->get();

            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return null;
            }



	}



	public function count_products($id)
	{
	$this->db->select('*');
	$this->db->from('products');
	$this->db->where('products.user_id', $id);

	echo $this->db->count_all_results();

	}





public function get_products_date($current_month=NULL)
	{

			$date = new DateTime("now");
			$curr_date = $date->format('Y-m-d ');
			$this->db->select('*');
            $this->db->from('products');
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

		$this->db->select('products.*, u.first_name, u.last_name');
			$this->db->from('products');
			$this->db->join('users u', 'u.id=products.user_id');
			$this->db->where('products.id', $id);
			$query = $this->db->get();
			return $query->row();
	}




	public function get_products_data($id = null, $user_id)
		{
	        if ($id != null) {
	            $this->db->select('*');
	            $this->db->from('products_data');
	            $this->db->where('product_id', $id);
				$this->db->where('user_id', $user_id);

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
		$this->db->insert('products', $blogData);
		return $this->db->insert_id();
	}




	public function update($id, $blogData)
	{
		$this->db->where('id', $id);
		$this->db->update('products', $blogData);
	}


	public function delete($id)
	{
		$this->db->where('id', $id);
		$this->db->delete('products');
	}


}
